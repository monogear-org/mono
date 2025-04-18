FROM python:3.11-slim

# Install required packages
RUN apt-get update && apt-get install -y \
    apache2 \
    apache2-utils \
    git \
    spawn-fcgi \
    fcgiwrap \
    supervisor \
    && rm -rf /var/lib/apt/lists/*

# Enable necessary Apache modules
RUN a2enmod cgi alias env rewrite auth_basic

# Create directory for Git repositories
RUN mkdir -p /var/www/git && chown -R www-data:www-data /var/www/git

# Create test bare repo
RUN cd /var/www/git && git init --bare myrepo.git && chown -R www-data:www-data myrepo.git

# Create .htpasswd with test user: user/pass
RUN htpasswd -cb /etc/apache2/.htpasswd user pass

# Add Apache site configuration
RUN echo '<VirtualHost *:80>\n\
    ServerName localhost\n\
    SetEnv GIT_PROJECT_ROOT /var/www/git\n\
    SetEnv GIT_HTTP_EXPORT_ALL\n\
    ScriptAlias /git/ /usr/lib/git-core/git-http-backend/\n\
    <Directory "/usr/lib/git-core">\n\
        Options +ExecCGI -MultiViews +SymLinksIfOwnerMatch\n\
        AllowOverride None\n\
        Require all granted\n\
    </Directory>\n\
    <LocationMatch "^/git/.*$">\n\
        AuthType Basic\n\
        AuthName "Git Access"\n\
        AuthUserFile /etc/apache2/.htpasswd\n\
        Require valid-user\n\
    </LocationMatch>\n\
</VirtualHost>' > /etc/apache2/sites-available/git.conf

RUN a2dissite 000-default && a2ensite git

# Copy your Python app
WORKDIR /app
COPY . /app
RUN pip install --no-cache-dir -r requirements.txt || true

# Supervisor config to run both Apache and Python app
RUN mkdir -p /var/log/supervisor
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf

EXPOSE 80
CMD ["/usr/bin/supervisord"]