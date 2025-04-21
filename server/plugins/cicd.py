import os
from .db import (
    get_user_password, set_user_password, get_repo_access, add_repo_access, remove_repo_access,
    remove_user_if_no_access, get_all_repo_access, get_all_users, get_configured, set_configured, set_value, get_value
)
import subprocess
import random
import time

def handle_cicd(repo_name, branch, commit_hash):
    repo_name=repo_name.split(".git")[0]
    username = "cicd-bot"
    comments = get_value("comments_"+commit_hash)
    if comments in [False, None]:
        comments = []
    comments.append({
        "name": username,
        "message": "Building current pushed change and deploying it for staging purposes.",
        "time":time.time()
    })
    set_value("comments_"+commit_hash, comments)
    zip_path = f"{repo_name}-{branch}-{commit_hash}"
    if os.system(f"cd /tmp && mkdir {zip_path} && mv {zip_path}.zip {zip_path}/ && cd {zip_path} && unzip {zip_path}.zip") != 0:
        set_value(f"commit_status_{commit_hash[:7]}", "failed")
        return

    work_dir = f"/tmp/{repo_name}-{branch}-{commit_hash}"
    port=random.randint(40000, 40040)
    try:
        result = subprocess.run(
            ["./build.sh", "-p", str(port)],
            cwd=work_dir,
            timeout=60
        )
    except subprocess.TimeoutExpired:
        set_value(f"commit_status_{commit_hash[:7]}", "success")
        username = "cicd-bot"
        comments = get_value("comments_"+commit_hash)
        if comments in [False, None]:
            comments = []
        comments.append({
            "name": username,
            "message": "Build is currently live at http://localhost:"+str(port),
            "time":time.time()
        })
        set_value("comments_"+commit_hash, comments)

    set_value(f"commit_status_{commit_hash[:7]}", "failed")