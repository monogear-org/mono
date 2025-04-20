import sqlite3
import os
from contextlib import contextmanager

DB_PATH = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'monogear.db'))

def init_db():
    with sqlite3.connect(DB_PATH) as conn:
        c = conn.cursor()
        c.execute('''CREATE TABLE IF NOT EXISTS users (
            username TEXT PRIMARY KEY,
            password TEXT NOT NULL
        )''')
        c.execute('''CREATE TABLE IF NOT EXISTS repo_access (
            repo TEXT,
            username TEXT,
            PRIMARY KEY (repo, username)
        )''')
        c.execute('''CREATE TABLE IF NOT EXISTS config (
            key TEXT PRIMARY KEY,
            value TEXT
        )''')
        c.execute('INSERT OR IGNORE INTO users (username, password) VALUES (?, ?)', ("admin", "admin"))
        c.execute('INSERT OR IGNORE INTO repo_access (repo, username) VALUES (?, ?)', ("base.git", "admin"))
        c.execute('INSERT OR IGNORE INTO config (key, value) VALUES (?, ?)', ("configured", "false"))
        conn.commit()

@contextmanager
def db_cursor():
    conn = sqlite3.connect(DB_PATH)
    try:
        yield conn.cursor()
        conn.commit()
    finally:
        conn.close()

def get_user_password(username):
    with db_cursor() as c:
        row = c.execute('SELECT password FROM users WHERE username=?', (username,)).fetchone()
        return row[0] if row else None

def set_user_password(username, password):
    with db_cursor() as c:
        c.execute('INSERT OR REPLACE INTO users (username, password) VALUES (?, ?)', (username, password))


def get_repo_access(repo):
    with db_cursor() as c:
        rows = c.execute('SELECT username FROM repo_access WHERE repo=?', (repo,)).fetchall()
        return [r[0] for r in rows]

def add_repo_access(repo, username):
    with db_cursor() as c:
        c.execute('INSERT OR IGNORE INTO repo_access (repo, username) VALUES (?, ?)', (repo, username))

def remove_repo_access(repo, username):
    with db_cursor() as c:
        c.execute('DELETE FROM repo_access WHERE repo=? AND username=?', (repo, username))


def remove_user_if_no_access(username):
    with db_cursor() as c:
        rows = c.execute('SELECT 1 FROM repo_access WHERE username=?', (username,)).fetchone()
        if not rows and username != 'admin':
            c.execute('DELETE FROM users WHERE username=?', (username,))

def get_all_repo_access():
    with db_cursor() as c:
        rows = c.execute('SELECT repo, username FROM repo_access').fetchall()
        access = {}
        for repo, username in rows:
            access.setdefault(repo, []).append(username)
        return access

def get_all_users():
    with db_cursor() as c:
        rows = c.execute('SELECT username, password FROM users').fetchall()
        return {u: p for u, p in rows}

def get_configured():
    with db_cursor() as c:
        row = c.execute('SELECT value FROM config WHERE key="configured"').fetchone()
        return row[0] == "true" if row else False

def set_configured():
    with db_cursor() as c:
        c.execute('UPDATE config SET value="true" WHERE key="configured"')

init_db()