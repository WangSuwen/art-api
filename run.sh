#!/bin/bash
git pull origin master
NODE_MODULES="node_modules"
DATE=$(date +%Y_%m_%d)
touch /var/log/art-api/$DATE.log
pm2 stop artApi
pm2 delete artApi
if [ -d $NODE_MODULES ]; then
  rm -rf $NODE_MODULES
fi
echo "npm installing..."
npm i
echo "server starting..."
pm2 start ./bin/server.js --name artApi --log /var/log/art-api/$DATE.log