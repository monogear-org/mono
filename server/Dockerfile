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

RUN printf '%s\n' \
  '#!/bin/bash' \
  'export GIT_PROJECT_ROOT=/var/www/git' \
  'export GIT_HTTP_EXPORT_ALL=1' \
  'export GIT_PUSH_USER="$REMOTE_USER"' \
  'exec /usr/lib/git-core/git-http-backend' \
  > /usr/local/bin/git-http-wrapper \
  && chmod +x /usr/local/bin/git-http-wrapper \
  && chown www-data:www-data /usr/local/bin/git-http-wrapper

RUN mkdir -p /var/www/git && chown -R www-data:www-data /var/www/git

RUN cd /var/www/git \
  && git init --bare base.git \
  && chown -R www-data:www-data base.git

RUN printf '%s\n' \
  '#!/bin/bash' \
  'REPO_PATH=$(pwd)' \
  'REPO_NAME=$(basename "$REPO_PATH" .git)' \
  'while read oldrev newrev refname; do' \
  '  BRANCH=${refname#refs/heads/}' \
  '  COMMIT_HASH=$newrev' \
  '  USERNAME=${GIT_PUSH_USER:-unknown}' \
  '  WORKDIR=/tmp/${REPO_NAME}-${BRANCH}-${COMMIT_HASH}' \
  '  ZIP_PATH=/tmp/${REPO_NAME}-${BRANCH}-${COMMIT_HASH}.zip' \
  '  LATEST_ZIP=/var/www/git/${REPO_NAME}-${BRANCH}-latest.zip' \
  '  rm -rf "$WORKDIR"' \
  '  mkdir -p "$WORKDIR"' \
  '  git --work-tree="$WORKDIR" checkout "$COMMIT_HASH" -- .' \
  '  cd "$WORKDIR"' \
  '  zip -r "$ZIP_PATH" . > /dev/null' \
  '  cp "$ZIP_PATH" "$LATEST_ZIP"' \
  '  curl -X POST "http://localhost:5000/cicd/${REPO_NAME}/${BRANCH}/${COMMIT_HASH}" -H "X-Username: ${USERNAME}" || echo "API call failed"' \
  '  rm -rf "$WORKDIR"' \
  'done' \
  > /var/www/git/base.git/hooks/post-receive \
  && chmod +x /var/www/git/base.git/hooks/post-receive \
  && chown www-data:www-data /var/www/git/base.git/hooks/post-receive

RUN htpasswd -cb /etc/apache2/.htpasswd admin admin

RUN printf '%s\n' \
  '<VirtualHost *:80>' \
  'ServerName localhost' \
  'ScriptAlias /git/ /usr/local/bin/git-http-wrapper' \
  '<Directory "/usr/local/bin">' \
  'Options +ExecCGI' \
  'Require all granted' \
  '</Directory>' \
  '<Location /git/>' \
  'AuthType Basic' \
  'AuthName "Git Access"' \
  'AuthUserFile /etc/apache2/.htpasswd' \
  'Require valid-user' \
  '</Location>' \
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