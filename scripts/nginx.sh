sudo cp ./ci/conf.nginx /etc/nginx/sites-available/freelance-template.qraxiss.com

sudo ln -s /etc/nginx/sites-available/freelance-template.qraxiss.com /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx