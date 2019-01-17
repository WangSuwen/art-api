#!/bin/bash
git pull origin master
pm2 stop artApi
pm2 delete artApi
NODE_MODULES="node_modules"
if [ -d $NODE_MODULES ]; then
  rm -rf $NODE_MODULES
fi
echo "npm installing..."
npm i
echo "server starting..."
pm2 start ./bin/server.js --name artApi --log /var/log/art-api