#!/bin/bash
pm2 stop artApi
pm2 delete artApi
pm2 start ../bin/server.js