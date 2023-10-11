#! /bin/bash

if [ -z $TAG ]; then
    echo "No TAG provided, build with latest tag"
    echo "Usage: TAG=<inset-tag-number> npm run docker:build"
    TAG="latest"
fi

docker build -t global-sports:$TAG -f ./Dockerfile .