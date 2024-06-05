#!/bin/sh

cd /var/www || exit

chmod -R 777 storage
chmod -R 777 bootstrap/cache/
chmod -R ug+rwx storage bootstrap/cache

php artisan cache:clear
php artisan route:cache
php artisan optimize:clear
php artisan event:cache
php artisan config:cache
php artisan route:cache

/usr/bin/supervisord -c /etc/supervisord.conf
