import subprocess, json
from flask import Flask, config, request

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

regenerate_htpasswd()
regenerate_apache_conf()
app.run(host="0.0.0.0", port=5000)