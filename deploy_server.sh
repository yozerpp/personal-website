#!/bin/bash
serverDir=$1
origin="${2:-https://yozer.com.tr}"
port="${3:-3000}"
kill -9 $(lsof -i :$port | awk '{print $2}' | tail +2)
cd $serverDir && npm ci --omit=dev
echo "starting inside remote"
ORIGIN=$origin HOST=127.0.0.1 PORT=$port nohup node "$serverDir" > "$serverDir/log.txt" 2>&1 &