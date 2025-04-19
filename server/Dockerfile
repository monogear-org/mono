FROM python:3.11-slim

RUN apt-get update && apt-get install -y \
    apache2 \
    apache2-utils \
    git \
    spawn-fcgi \
    fcgiwrap \
    supervisor \
    curl \
    zip \
    tmux \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

RUN a2enmod cgi alias env rewrite auth_basic

RUN mkdir -p /var/www/git && chown -R www-data:www-data /var/www/git

RUN printf '%s\n' \
  '#!/bin/bash' \
  'set -e' \
  'REPO_PATH=$(pwd)' \
  'REPO_NAME=$(basename "$REPO_PATH" .git)' \
  'while read oldrev newrev refname' \
  'do' \
  '  BRANCH=$(echo "$refname" | sed "s|refs/heads/||")' \
  '  COMMIT_HASH="$newrev"' \
  '  WORKDIR="/tmp/${REPO_NAME}-${BRANCH}-${COMMIT_HASH}"' \
  '  ZIP_PATH="/tmp/${REPO_NAME}-${BRANCH}-${COMMIT_HASH}.zip"' \
  '  rm -rf "$WORKDIR"' \
  '  mkdir -p "$WORKDIR"' \
  '  git --work-tree="$WORKDIR" checkout "$COMMIT_HASH" -- .' \
  '  cd "$WORKDIR"' \
  '  zip -r "$ZIP_PATH" . > /dev/null' \
  '  curl -X POST "http://localhost:5000/cicd/${REPO_NAME}/${BRANCH}/${COMMIT_HASH}" || echo "API call failed"' \
  '  rm -rf "$WORKDIR"' \
  'done' \
  > /usr/local/bin/git-post-receive

RUN chmod +x /usr/local/bin/git-post-receive

RUN cd /var/www/git && \
    git init --bare base.git && \
    chown -R www-data:www-data base.git && \
    ln -sf /usr/local/bin/git-post-receive /var/www/git/base.git/hooks/post-receive

RUN htpasswd -cb /etc/apache2/.htpasswd admin admin

RUN printf '%s\n' \
  '<VirtualHost *:80>' \
  '    ServerName localhost' \
  '    SetEnv GIT_PROJECT_ROOT /var/www/git' \
  '    SetEnv GIT_HTTP_EXPORT_ALL' \
  '    ScriptAlias /git/ /usr/lib/git-core/git-http-backend/' \
  '    <Directory "/usr/lib/git-core">' \
  '        Options +ExecCGI -MultiViews +SymLinksIfOwnerMatch' \
  '        AllowOverride None' \
  '        Require all granted' \
  '    </Directory>' \
  '    <LocationMatch "^/git/.*$">' \
  '        AuthType Basic' \
  '        AuthName "Git Access"' \
  '        AuthUserFile /etc/apache2/.htpasswd' \
  '        Require valid-user' \
  '    </LocationMatch>' \
  '</VirtualHost>' \
  > /etc/apache2/sites-available/git.conf

RUN a2dissite 000-default && a2ensite git

WORKDIR /app
COPY . /app

RUN pip install --no-cache-dir -r requirements.txt || true

RUN mkdir -p /var/log/supervisor
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf

EXPOSE 80
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]