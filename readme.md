Digitalocean cloud computing service gives bonuse ($100 60-day credit) for the referal link registrution
https://m.do.co/c/efb7a38dd3eb


# VPS setup
## add admin user
adduser cicd
sudo usermod -aG sudo cicd
su - cicd

## setup project
```curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash && \
source ~/.bashrc && \
nvm i 16 && \
sudo apt update && \
sudo apt install -y npm && \
sudo npm install -y pm2@latest -g && \
sudo apt install -y nginx && \
sudo ufw allow 'Nginx HTTP' && \```

```sudo mkdir /var/www/cicd-react-example && \
sudo chmod -R 777 /var/www/cicd-react-example```

## do not use password for cicd user to execute nginx commands
sudo visudo -f /etc/sudoers.d/cicd
cicd ALL=(ALL) NOPASSWD: /user/sbin/service nginx start, /user/sbin/service nginx stop, /user/sbin/service nginx restart

## check NGINX status
service nginx status


## setup github runner
## Download the latest runner package
    repository settings -> Actions -> Runners -> New self-hosted runner

## install runner on VPS
- navigate to project folder
    ```cd /var/www/cicd-react-example```
- run commands provided by github
IMPORTANT: change permissions before Configure step
    ```sudo chmod -R 777 /var/www/cicd-react-example```

    Example: (plz use the github commands and DO NOT use the example bellow)

    ```$ curl -o actions-runner-osx-x64-2.284.0.tar.gz -L https://github.com/actions/runner/releases/download/v2.284.0/actions-runner-osx-x64-2.284.0.tar.gz```
    # Optional: Validate the hash
    ```$ echo "5f9dc650058151ddec7308d1fde89ab926af9dfcb5cf8137e6fe520baee8dbd3  actions-runner-osx-x64-2.284.0.tar.gz" | shasum -a 256 -c```
    # Extract the installer
    ```$ sudo tar xzf ./actions-runner-osx-x64-2.284.0.tar.gz```
    
    # Create the runner and start the configuration experience
    ```$ ./config.sh --url https://github.com/mankokv/CICD_angular_nodejs --token ANSHTVJYEMRRPDSZMPRGH2LBTLR3U```
    ## start runner
    ```./svc.sh start```

## config NGINX
    # Configuration example:
    ```sudo nano /etc/nginx/sites-enabled/default```

    ```
            server {

                    root /var/www/cicd-react-example/_work/CICD_react_nodejs/CICD_react_nodejs;

                    index index.html index.htm index.nginx-debian.html;

                    server_name cicd-react-nodejs.com 167.71.66.109;

                    location / {
                            proxy_pass http://localhost:5000;
                            proxy_http_version 1.1;
                            proxy_set_header Upgrade $http_upgrade;
                            proxy_set_header Connection 'upgrade';
                            proxy_set_header Host $host;
                            proxy_cache_bypass $http_upgrade;
                    }
            }
    ```


## config node js runner
```pm2 start index.js```

## Save node js runner config to make nodejs runs even VPS restarted
```pm2 save```

 
The list of useful things:
 - digitalocean getting started (https://docs.digitalocean.com/products/getting-started/)
 - NGINX base knowledge (https://nginx.org/en/docs/beginners_guide.html)