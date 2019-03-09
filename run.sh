#!/bin/bash
git pull origin master
NODE_MODULES="node_modules"
DATE=$(date +%Y_%m_%d)
touch /var/log/art-api/$DATE.log
if [ -d $NODE_MODULES ]; then
  rm -rf $NODE_MODULES
fi
echo -e "\033[35m npm installing... \033[0m"
npm i
pm2 stop artApi
pm2 delete artApi
echo -e "\033[35m server starting... \033[0m"
pm2 start ./bin/server.js --name artApi --log /var/log/art-api/$DATE.log