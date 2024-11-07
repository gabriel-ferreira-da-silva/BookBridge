if [ "$1" = "--check" ] || [ "$1" = "-p" ]; then
    if [ "$2" = "--user-login" ]; then
        curl --header "Content-Type: application/json" \
             --request POST \
             --data '{"username":"user","password":"user"}' \
             http://localhost:4000/api/user/login
        exit 1
    fi

    if [ "$2" = "--user-create" ]; then
        curl --header "Content-Type: application/json" \
             --request POST \
             --data '{"name":"carlos","username":"carlos_user","email":"carlos@email.com","password":"carlos"}' \
             http://localhost:4000/api/user
        exit 1
    fi
fi
