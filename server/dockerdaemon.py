import subprocess, json
from flask import Flask, request, Response
import os, tempfile
from functools import wraps
from db import (
    get_user_password, set_user_password, get_repo_access, add_repo_access, remove_repo_access,
    remove_user_if_no_access, get_all_repo_access, get_all_users, get_configured, set_configured, set_value, get_value
)
import time, datetime

app = Flask(__name__)

@app.before_request
def handle_options():
    if request.method == "OPTIONS":
        return Response(status=200)

@app.after_request
def add_cors_headers(response):
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS"
    response.headers["Access-Control-Allow-Headers"] = "Authorization, Content-Type"
    return response

def check_auth(username, password):
    pw = get_user_password(username)
    return pw is not None and pw == password

def require_auth(admin_only=False):
    def decorator(f):
        @wraps(f)
        def wrapper(*args, **kwargs):
            auth = request.authorization
            if not auth or not check_auth(auth.username, auth.password):
                return Response("Authentication required", 401, {"WWW-Authenticate": "Basic realm=\"Login Required\""})
            if admin_only and auth.username != "admin":
                return Response("Admin access required", 403)
            return f(*args, **kwargs)
        return wrapper
    return decorator

HTPASSWD_PATH = "/etc/apache2/.htpasswd"
APACHE_CONF_PATH = "/etc/apache2/sites-available/git.conf"

last_push = ""

@app.route("/")
def index():
    resp = Response(json.dumps({
        "status": "ok",
        "message": "Python server running alongside Apache Git server",
        "last_push": last_push
    }), mimetype="application/json")
    return resp

@app.route("/check_credentials")
def check_credentials():
    args=dict(request.args)
    return json.dumps(check_auth(args["username"], args["password"]))

@app.route("/set_user_data", methods = ["POST"])
@require_auth()
def set_user_data():
    args = request.json
    username = request.authorization.username
    current_data = get_value("user_"+username)
    if current_data in [False, None]:
        current_data = {
            "username": username,
            "name": username,
            "profileImage": None
        }
    for x in args:
        current_data[x] = args[x]
    set_value("user_"+username, current_data)
    return json.dumps(True)

@app.route("/cicd/<string:repo_name>/<string:branch>/<string:commit_hash>", methods=["POST"])
def handle_cicd(repo_name, branch, commit_hash):
    username = request.environ.get("HTTP_X_USERNAME")
    global last_push
    last_push = [repo_name, branch, commit_hash]
    repo_path = f"/var/www/git/{repo_name}.git"

    author = subprocess.run([
        "git", "--git-dir", repo_path, "log", "-1", "--pretty=format:%an", branch
    ], stdout=subprocess.PIPE).stdout.decode().strip()

    message = subprocess.run([
        "git", "--git-dir", repo_path, "log", "-1", "--pretty=format:%s", branch
    ], stdout=subprocess.PIPE).stdout.decode().strip()

    date = subprocess.run([
        "git", "--git-dir", repo_path, "log", "-1", "--pretty=format:%ad", "--date=iso", branch
    ], stdout=subprocess.PIPE).stdout.decode().strip()

    diffstat = subprocess.run([
        "git", "--git-dir", repo_path, "show", "--numstat", "--oneline", branch
    ], stdout=subprocess.PIPE).stdout.decode().splitlines()
    added, removed = 0, 0
    for line in diffstat:
        parts = line.strip().split("\t")
        if len(parts) == 3 and parts[0].isdigit() and parts[1].isdigit():
            added += int(parts[0])
            removed += int(parts[1])
    resp = Response(json.dumps({
        "status": "ok",
        "message": f"Received push for {repo_name} on branch {branch} at {commit_hash}",
        "data": {
            "username": username,
            "repo": repo_name,
            "branch": branch,
            "commit": commit_hash,
            "author": author,
            "commit_message": message,
            "commit_date": date,
            "lines_added": added,
            "lines_removed": removed
        }
    }), mimetype="application/json")
    repo_name = repo_name+".git"
    set_repo_data(repo_name, {
        "name": repo_name,
        "description": get_repo_data(repo_name)["description"],
        "latestBranch": branch,
        "lastUpdated": time.time()
    })
    return resp

@app.route("/access", methods=["POST"])
@require_auth(admin_only=True)
def set_access():
    data = request.json
    user = data.get("user")
    repo = data.get("repo")
    password = data.get("password")
    if not all([user, repo, password]):
        return json.dumps({"status": "error", "message": "Missing fields"}), 400
    add_repo_access(repo, user)
    set_user_password(user, password)
    regenerate_htpasswd()
    regenerate_apache_conf()
    reload_apache()
    resp = Response(json.dumps({"status": "ok", "message": f"Access added for user: {user}"}), mimetype="application/json")
    return resp

@app.route("/access", methods=["DELETE"])
@require_auth(admin_only=True)
def remove_access():
    data = request.json
    user = data.get("user")
    repo = data.get("repo")
    if not all([user, repo]):
        return json.dumps({"status": "error", "message": "Missing fields"}), 400
    if user == "admin":
        resp = Response(json.dumps({"status": "error", "message": "Cannot remove admin user from access"}), mimetype="application/json")
        resp.status_code = 400
        return resp
    if get_repo_access(repo) and user in get_repo_access(repo):
        remove_repo_access(repo, user)
        if not any(user in users for users in get_all_repo_access().values()):
            remove_user_if_no_access(user)
        regenerate_htpasswd()
        regenerate_apache_conf()
    else:
        resp = Response(json.dumps({"status": "error", "message": "User/repo not found"}), mimetype="application/json")
        resp.status_code = 404
        return resp
    reload_apache()
    resp = Response(json.dumps({"status": "ok", "message": "Access revoked"}), mimetype="application/json")
    return resp

@app.route("/access", methods=["GET"])
@require_auth(admin_only=True)
def get_access():
    access = get_all_repo_access()
    resp = Response(json.dumps({"status": "ok", "data": access}), mimetype="application/json")
    return resp

def regenerate_htpasswd():
    try:
        lines = []
        users = get_all_users()
        for user, password in users.items():
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
        for repo, users in get_all_repo_access().items():
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
@require_auth(admin_only=True)
def manual_reload():
    reload_apache()
    return "Apache reloading"

@app.route("/repos")
@require_auth()
def list_repos():
    base = "/var/www/git"
    try:
        repos = [x for x in os.listdir(base) if x.endswith(".git") and os.path.isdir(os.path.join(base, x))]
    except:
        repos = []
    resp = Response(json.dumps({"status": "ok", "data": sorted(repos)}), mimetype="application/json")
    return resp

@app.route("/repo/<repo>/branches")
@require_auth()
def repo_branches(repo):
    base = "/var/www/git"
    repo_path = os.path.join(base, repo)
    if not os.path.isdir(repo_path):
        return json.dumps({"status": "ok", "data": []})
    p = subprocess.run(["git", "--git-dir", repo_path, "branch", "-a", "--format=%(refname:short)"], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    branches = [b for b in p.stdout.decode().splitlines() if b]
    resp = Response(json.dumps({"status": "ok", "data": sorted(branches)}), mimetype="application/json")
    return resp

def build_file_tree(path, prefix=""):
    nodes = []
    for idx, name in enumerate(sorted(os.listdir(path)), start=1):
        node_id = f"{prefix}-{idx}" if prefix else str(idx)
        full_path = os.path.join(path, name)
        if os.path.isdir(full_path):
            children = build_file_tree(full_path, node_id)
            nodes.append({
                "id": node_id,
                "name": name,
                "type": "directory",
                "children": children
            })
        else:
            nodes.append({
                "id": node_id,
                "name": name,
                "type": "file"
            })
    return nodes

@app.route("/repo/<repo>/<branch>/file_tree")
@require_auth()
def repo_file_tree(repo, branch):
    base = "/var/www/git"
    repo_path = os.path.join(base, repo)
    if not os.path.isdir(repo_path):
        return Response(json.dumps({"status": "ok", "files": []}), mimetype="application/json")

    with tempfile.TemporaryDirectory() as tmp:
        subprocess.run(
            ["git", "config", "--global", "--add", "safe.directory", repo_path],
            stdout=subprocess.DEVNULL,
            stderr=subprocess.DEVNULL
        )
        result = subprocess.run(
            ["git", "clone", "--branch", branch, "--single-branch", repo_path, tmp],
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE
        )
        if result.returncode != 0:
            resp = Response(
                json.dumps({
                    "status": "error",
                    "message": "clone failed",
                    "details": result.stderr.decode()
                }),
                mimetype="application/json"
            )
            resp.status_code = 500
            return resp

        files = build_file_tree(tmp)
        return Response(
            json.dumps({"status": "ok", "files": files}),
            mimetype="application/json"
        )

@app.route("/repo/<repo>/<branch>/commits")
@require_auth()
def repo_commits(repo, branch):
    base = "/var/www/git"
    repo_path = os.path.join(base, repo)
    if not os.path.isdir(repo_path):
        return json.dumps({"status": "ok", "data": []})

    p = subprocess.run(
        ["git", "--git-dir", repo_path, "log", branch,
            "--pretty=format:%H|%an|%ad|%s", "--date=iso"],
        stdout=subprocess.PIPE, stderr=subprocess.PIPE
    )
    lines = p.stdout.decode().splitlines()

    def human(delta):
        s = int(delta.total_seconds())
        for name, secs in [
            ("year", 31536000), ("month", 2592000),
            ("day", 86400), ("hour", 3600),
            ("minute", 60), ("second", 1)
        ]:
            count = s // secs
            if count:
                return f"{count} {name}{'s' if count>1 else ''} ago"
        return "just now"

    now = datetime.datetime.now()
    commits = []
    for line in lines:
        parts = line.split("|", 3)
        if len(parts) != 4:
            continue
        full_hash, author, date_iso, message = parts
        try:
            dt = datetime.datetime.fromisoformat(date_iso.strip())
            date_str = human(now - dt)
        except Exception:
            date_str = date_iso

        commits.append({
            "id": full_hash[:7],
            "message": message,
            "author": author,
            "date": date_str,
            "status": "failed"
        })

    return Response(json.dumps({"status": "ok", "data": commits}),
                    mimetype="application/json")

@app.route("/repo/new/<name>", methods=["GET"])
@require_auth(admin_only=True)
def create_repo(name):
    if not name or "/" in name or name.endswith(".git"):
        resp = Response(json.dumps({"status": "error", "message": "invalid repo name"}), mimetype="application/json")
        resp.status_code = 400
        return resp
    repo_dir = f"/var/www/git/{name}.git"
    if os.path.exists(repo_dir):
        resp = Response(json.dumps({"status": "error", "message": "repo exists"}), mimetype="application/json")
        resp.status_code = 400
        return resp
    result = subprocess.run(["git", "init", "--bare", repo_dir], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    if result.returncode != 0:
        resp = Response(json.dumps({"status": "error", "message": result.stderr.decode()}), mimetype="application/json")
        resp.status_code = 500
        return resp
    add_repo_access(f"{name}.git", "admin")
    resp = Response(json.dumps({"status": "ok", "created": True, "message": f"Repository '{name}' created"}), mimetype="application/json")
    return resp

@app.route("/set_repo_settings")
@require_auth(admin_only=True)
def set_repo_route_data():
    set_repo_data(request.json)

@app.route("/configured", methods=["GET"])
def configured_get_route():
    resp = Response(json.dumps({"configured": get_configured()}), mimetype="application/json")
    return resp

@app.route("/configured", methods=["POST"])
@require_auth(admin_only=True)
def configured_post_route():
    if get_configured():
        resp = Response(json.dumps({"status": "ok", "configured": True, "message": "Server has already been configured"}), mimetype="application/json")
        return resp
    set_configured()
    resp = Response(json.dumps({"status": "ok", "configured": True, "message": "Server marked as configured"}), mimetype="application/json")
    return resp

def get_repo_data(name):
    default = {
        "name": name,
        "description": "no description provided",
        "latestBranch": "master",
        "lastUpdated": 0,
        "repo": name,
        "id": name,
        "owner": "monogear",
        "icon": name[0].upper()
    }
    
    value = get_value("data_repo_"+name)
    
    if value in [False, None]:
        value = default
    else:
        for x in default:
            if x not in value:
                value[x] = default[x]
    
    return value

def set_repo_data(name, data):
    value = get_value("data_repo_"+name)
    if value in [False, None]:
        value = {}
    set_value("data_repo_"+name, value | data)

@app.route("/repos_data")
@require_auth()
def projects_data_route():
    base = "/var/www/git"
    try:
        repos = [x for x in os.listdir(base) if x.endswith(".git") and os.path.isdir(os.path.join(base, x))]
    except:
        repos = []
    
    data = [get_repo_data(x) for x in repos]
    
    return data

regenerate_htpasswd()
regenerate_apache_conf()

app.run(host="0.0.0.0", port=5000)