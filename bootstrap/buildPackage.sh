#!/bin/bash

PACKAGE=$1
VERSION=$2

IMAGE_NAME="autonomous-$PACKAGE"

DOCKER_TAG="$IMAGE_NAME:$VERSION"
DOCKER_FILE="packages/$PACKAGE/Dockerfile"

if [ -z "$VERSION" ] || [ -z "$PACKAGE" ]; then
    echo "Usage $0 <PACKAGE> <VERSION>"
fi

if [ -f $DOCKERFILE ]; then
    docker build . -t $DOCKER_TAG -f $DOCKER_FILE
else
    echo "Package not found at $DOCKER_FILE"
fi
