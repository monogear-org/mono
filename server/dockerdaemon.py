import subprocess, json
from flask import Flask, request
import os, tempfile

app = Flask(__name__)

REPO_ACCESS_PATH = "/app/repo_access.json"
USER_PASSWORDS_PATH = "/app/user_passwords.json"
HTPASSWD_PATH = "/etc/apache2/.htpasswd"
APACHE_CONF_PATH = "/etc/apache2/sites-available/git.conf"
repo_access = {}
user_passwords = {}
starting_repo = "base.git"

def load_state():
    global repo_access, user_passwords
    try:
        with open(REPO_ACCESS_PATH) as f:
            repo_access = {key: set(value) for key, value in json.load(f).items()}
    except:
        repo_access = {starting_repo: {"admin"}}
    try:
        with open(USER_PASSWORDS_PATH) as f:
            user_passwords = json.loads(f.read())
    except:
        user_passwords = {"admin": "admin"}

def save_state():
    with open(REPO_ACCESS_PATH, "w") as f:
        f.write(json.dumps({key: list(value) for key, value in repo_access.items()}))
    with open(USER_PASSWORDS_PATH, "w") as f:
        f.write(json.dumps(user_passwords))

load_state()

last_push = ""

@app.route("/")
def index():
    return "Python server running alongside Apache Git server. Last push: " + str(last_push)

@app.route("/cicd/<string:repo_name>/<string:branch>/<string:commit_hash>", methods=["POST"])
def handle_cicd(repo_name, branch, commit_hash):
    global last_push
    last_push = [repo_name, branch, commit_hash]
    return f"Received push for {repo_name} on branch {branch} at {commit_hash}"

@app.route("/access", methods=["POST"])
def set_access():
    data = request.json
    user = data.get("user")
    repo = data.get("repo")
    password = data.get("password")
    if not all([user, repo, password]):
        return "Missing fields"
    if repo not in repo_access:
        repo_access[repo] = set()
    repo_access[repo].add(user)
    user_passwords[user] = password
    save_state()
    regenerate_htpasswd()
    regenerate_apache_conf()
    reload_apache()
    return "Access added for user: "+str(user)

@app.route("/access", methods=["DELETE"])
def remove_access():
    data = request.json
    user = data.get("user")
    repo = data.get("repo")
    if not all([user, repo]):
        return "Missing fields"
    if repo in repo_access and user in repo_access[repo]:
        repo_access[repo].remove(user)
        if not any(user in users for users in repo_access.values()):
            user_passwords.pop(user, None)
        save_state()
        regenerate_htpasswd()
        regenerate_apache_conf()
    else:
        return "User/repo not found"
    reload_apache()
    return "Access revoked"

@app.route("/access", methods=["GET"])
def get_access():
    return json.dumps({key: list(value) for key, value in repo_access.items()})

def regenerate_htpasswd():
    try:
        lines = []
        for user, password in user_passwords.items():
            completed = subprocess.run(["htpasswd", "-nbB", user, password], check=True, capture_output=True, text=True)
            lines.append(completed.stdout.strip())
        with open(HTPASSWD_PATH, "w") as f:
            f.write("\n".join(lines) + "\n")
    except:
        import traceback
        traceback.print_exc()

def regenerate_apache_conf():
    try:
        configuration = [
            "<VirtualHost *:80>",
            "    ServerName localhost",
            "    SetEnv GIT_PROJECT_ROOT /var/www/git",
            "    SetEnv GIT_HTTP_EXPORT_ALL",
            "    ScriptAlias /git/ /usr/lib/git-core/git-http-backend/",
            "    <Directory \"/usr/lib/git-core\">",
            "        Options +ExecCGI -MultiViews +SymLinksIfOwnerMatch",
            "        AllowOverride None",
            "        Require all granted",
            "    </Directory>"
        ]
        for repo, users in repo_access.items():
            if users:
                users_str = " ".join(sorted(users))
                configuration.append(f"    <LocationMatch \"^/git/{repo}\">")
                configuration.append("        AuthType Basic")
                configuration.append("        AuthName \"Git Access\"")
                configuration.append(f"        AuthUserFile {HTPASSWD_PATH}")
                configuration.append(f"        Require user {users_str}")
                configuration.append("    </LocationMatch>")
        configuration.append("</VirtualHost>")
        with open(APACHE_CONF_PATH, "w") as f:
            f.write("\n".join(configuration) + "\n")
    except:
        import traceback
        traceback.print_exc()

def reload_apache():
    try:
        subprocess.run(["apachectl", "graceful"])
    except:
        import traceback
        traceback.print_exc()

@app.route("/apache/reload")
def manual_reload():
    reload_apache()
    return "Apache reloading"

@app.route("/repos")
def list_repos():
    base = "/var/www/git"
    try:
        repos = [x for x in os.listdir(base) if x.endswith(".git") and os.path.isdir(os.path.join(base, x))]
    except:
        repos = []
    return json.dumps(sorted(repos))

@app.route("/repo/<repo>/branches")
def repo_branches(repo):
    base = "/var/www/git"
    repo_path = os.path.join(base, repo)
    if not os.path.isdir(repo_path):
        return json.dumps([])
    p = subprocess.run(["git", "--git-dir", repo_path, "branch", "-a", "--format=%(refname:short)"], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    branches = [b for b in p.stdout.decode().splitlines() if b]
    return json.dumps(sorted(branches))

@app.route("/repo/<repo>/<branch>/file_tree")
def repo_file_tree(repo, branch):
    base = "/var/www/git"
    repo_path = os.path.join(base, repo)
    if not os.path.isdir(repo_path):
        return json.dumps({})
    with tempfile.TemporaryDirectory() as tmp:
        p=os.system("git config --global --add safe.directory /var/www/git/"+repo)
        print(p)
        result = subprocess.run(["git", "clone", "--branch", branch, "--single-branch", repo_path, tmp], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        if result.returncode != 0:
            return json.dumps({"error": "clone failed", "details": result.stderr.decode()})
        tree = {}
        for root, dirs, files in os.walk(tmp):
            rel = os.path.relpath(root, tmp)
            d = tree
            if rel != ".":
                for part in rel.split(os.sep):
                    d = d.setdefault(part, {})
            for f in sorted(files):
                d[f] = None
            for dir in sorted(dirs):
                d.setdefault(dir, {})
        return json.dumps(tree, sort_keys=True)

@app.route("/repo/<repo>/<branch>/commits")
def repo_commits(repo, branch):
    base = "/var/www/git"
    repo_path = os.path.join(base, repo)
    if not os.path.isdir(repo_path):
        return json.dumps([])
    p = subprocess.run(["git", "--git-dir", repo_path, "log", branch, "--pretty=format:%H|%an|%ad", "--date=iso"], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    lines = p.stdout.decode().splitlines()
    commits = []
    for line in lines:
        parts = line.split("|", 2)
        if len(parts) == 3:
            commits.append({"hash": parts[0], "author": parts[1], "date": parts[2]})
    return json.dumps(commits)

@app.route("/repo/new/<name>", methods=["GET"])
def create_repo(name):
    if not name or "/" in name or name.endswith(".git"):
        return json.dumps({"error": "invalid repo name"})
    repo_dir = f"/var/www/git/{name}.git"
    if os.path.exists(repo_dir):
        return json.dumps({"error": "repo exists"})
    result = subprocess.run(["git", "init", "--bare", repo_dir], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    if result.returncode != 0:
        return json.dumps({"error": result.stderr.decode()})
    return json.dumps({"created": True})

regenerate_htpasswd()
regenerate_apache_conf()
app.run(host="0.0.0.0", port=5000)