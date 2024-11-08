if [ "$1" = "--check" ] || [ "$1" = "-p" ]; then
    if [ "$2" = "--user-login" ]; then
        curl --header "Content-Type: application/json" \
             --request POST \
             --data '{"username":"user","password":"user"}' \
             http://localhost:4000/api/user/login
        exit 1
    fi

    if [ "$2" = "--user-create" ]; then
        TOKEN="$(curl --header "Content-Type: application/json" --request POST --data '{"username":"user","password":"user"}'  http://localhost:4000/api/user/login)"
        
        curl --header "Content-Type: application/json" \
             --request POST\
             --data '{"name":"carlos","username":"carlos_user","email":"carlos@mail.com","password":"carlos", "token":'$TOKEN' }' \
             http://localhost:4000/api/user
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

    if [ "$2" = "--club-create" ]; then
        TOKEN="$(curl --header "Content-Type: application/json" --request POST --data '{"username":"user","password":"user"}'  http://localhost:4000/api/user/login)"
        
        curl --header "Content-Type: application/json" \
             --request POST \
             --data '{"name":"Clube de terror","description":"clube dedicado aos classicos de terror, suspense e policial", "token":'$TOKEN' }' \
             http://localhost:4000/api/club
        exit 1
    fi

    if [ "$2" = "--club-update" ]; then
        TOKEN="$(curl --header "Content-Type: application/json" --request POST --data '{"username":"user","password":"user"}'  http://localhost:4000/api/user/login)"
        
        curl --header "Content-Type: application/json" \
             --request PUT \
             --data '{"name":"Clube de filosofia classica","description":"clube dedicado aos classicos de filosofio greco romana","targetname":"Clube de terror", "token":'$TOKEN' }' \
             http://localhost:4000/api/club
        exit 1
    fi

    
    
fi
