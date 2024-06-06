FROM php:8.2-fpm

# Set working directory
WORKDIR /var/www

# Add docker php ext repo
ADD https://github.com/mlocati/docker-php-extension-installer/releases/latest/download/install-php-extensions /usr/local/bin/

# Install php extensions
RUN chmod +x /usr/local/bin/install-php-extensions && sync && \
    install-php-extensions mbstring pdo_pgsql pdo_mysql zip exif pcntl memcached

RUN docker-php-ext-install opcache

# Install dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    libpng-dev \
    libjpeg62-turbo-dev \
    libfreetype6-dev \
    locales \
    zip \
    jpegoptim optipng pngquant gifsicle \
    unzip \
    git \
    curl \
    lua-zlib-dev \
    libmemcached-dev \
    default-mysql-client \
    nginx

# Install supervisor
RUN apt-get install -y supervisor

# Install composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Clear cache
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Add user for laravel application
RUN groupadd -g 1000 www
RUN useradd -u 1000 -ms /bin/bash -g www www

# Copy code to /var/www
COPY --chown=www:www-data backend /var/www

# Copy nginx/php/supervisor configs
COPY deployment/supervisor.conf /etc/supervisord.conf
COPY deployment/php.ini /usr/local/etc/php/conf.d/app.ini
COPY deployment/nginx.conf /etc/nginx/sites-enabled/default
COPY deployment/opcache.ini /usr/local/etc/php/conf.d/opcache.ini
COPY deployment/run.sh /var/www/docker/run.sh

COPY backend/database/migrations /var/www/html/database/migrations

# PHP Error Log Files
RUN mkdir /var/log/php
RUN touch /var/log/php/errors.log && chmod 777 /var/log/php/errors.log

RUN chown -Rf www-data:www-data /var/www

# Deployment steps
RUN composer install --optimize-autoloader
RUN chmod +x /var/www/docker/run.sh

# add root to www group
RUN chmod -R ug+w /var/www/storage
RUN chmod -R 777 /var/www/storage

EXPOSE 80
ENTRYPOINT ["/var/www/docker/run.sh"]