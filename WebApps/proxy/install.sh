#!/bin/bash
apt install nginx
rm /etc/nginx/sites-enabled/default
BASEPATH="$(dirname "$(readlink -f "$0")")"

echo "#
## Enable $BASEPATH/nginx-proxy.conf 
#nginx-proxy
" >> /data/starter.txt 

ln -sf "$BASEPATH/nginx-proxy.service" /etc/systemd/system/
ln -sf "$BASEPATH/nginx-proxy" /usr/local/bin/

systemctl daemon-reload

