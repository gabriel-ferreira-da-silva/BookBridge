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


if [ "$1" = "--run" ]; then
    cd scripts
    lsof -t -i :4000 | xargs kill -9 
    ./run.sh
    cd ..
    exit 1
fi

if [ "$1" = "--test" ]; then

    lsof -t -i :4000 | xargs kill -9 
    
    cd scripts 
    ./run.sh &

    cd ..
    
    echo "Waiting for the server to start..."
    sleep 5

    
    while ! nc -z 127.0.0.1 4000; do
        echo "Waiting for server at 127.0.0.1:4000..."
        sleep 1 
    done

    ./build.sh --database --restart
    cd backend/tests
    npx jest
fi
