#!/bin/bash
serverAndUsername=(${1//@/ })
user=${serverAndUsername[0]}
server=${serverAndUsername[1]}
deployDir="${2:-/home/$user/personal-server}"
buildDir="${3:-./build}"
cp ./package.json ./package-lock.json $buildDir
tar -cjf build.tar.bz2 -C $buildDir .
chmod +r ./build.tar.bz2
ssh $user@$server "mkdir $deployDir; rm -r $deployDir/**"
scp ./build.tar.bz2 $user@$server:$deployDir/build.tar.bz2
ssh $user@$server tar -xjf "$deployDir/build.tar.bz2 -C $deployDir"
echo "starting server"
ssh $user@$server "bash -s -- $deployDir" < ./deploy_server.sh