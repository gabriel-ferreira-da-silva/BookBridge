#!/bin/bash

if [ -z "$1" ]; then
    cd scripts
    ./firstaction.sh
fi

if [ "$1" = "--push" ] || [ "$1" = "-p" ]; then
    if [ -z "$2" ]; then
        echo "no commit message given"
        exit 1
    fi
    cd scripts
    ./push.sh "$1" "$2"
    cd ..
    exit 1
fi

if [ "$1" = "--database" ] || [ "$1" = "-p" ]; then
    cd scripts
    ./database.sh "$1" "$2"
    cd ..
    exit 1
fi


if [ "$1" = "--request" ] || [ "$1" = "-req" ]; then
    cd scripts
    ./request.sh "$1" "$2"
    cd ..
    exit 1
fi


if [ "$1" = "--run" ] || [ "$1" = "-r" ]; then
    cd scripts
    ./run.sh & cd ..
    exit 1
fi