if [ "$1" = "--check" ] || [ "$1" = "-p" ]; then
    if [ "$2" = "--user-login" ]; then
        curl --header "Content-Type: application/json" \
             --request POST \
             --data '{"username":"user","password":"user"}' \
             http://localhost:4000/api/user/login
        exit 1
    fi

    if [ "$2" = "--user-update" ]; then
        TOKEN="$(curl --header "Content-Type: application/json" --request POST --data '{"username":"user","password":"user"}'  http://localhost:4000/api/user/login)"
        
        curl --header "Content-Type: application/json" \
             --request PUT \
             --data '{"name":"carlos picolo","username":"carlos_user","email":"carlos@outlook.com","password":"carlos", "token":'$TOKEN' }' \
             http://localhost:4000/api/user
        exit 1
    fi

    if [ "$2" = "--user-delete" ]; then
        TOKEN="$(curl --header "Content-Type: application/json" --request POST --data '{"username":"user","password":"user"}'  http://localhost:4000/api/user/login)"
        
        curl --header "Content-Type: application/json" \
             --request DELETE \
             --data '{"username":"carlos_user", "token":'$TOKEN' }' \
             http://localhost:4000/api/user
        exit 1
    fi
    
fi
