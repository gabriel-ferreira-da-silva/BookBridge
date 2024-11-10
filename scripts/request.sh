if [ "$1" = "--request" ] || [ "$1" = "--req" ]; then
    if [ "$2" = "--user-login" ]; then
        curl --header "Content-Type: application/json" \
             --request POST \
             --data '{"username":"user","password":"user"}' \
             http://localhost:4000/api/user/login | jq -r '.token'
        exit 1
    fi

    if [ "$2" = "--user-create" ]; then
        TOKEN="$(curl --header "Content-Type: application/json" --request POST --data '{"username":"user","password":"user"}'  http://localhost:4000/api/user/login | jq -r '.token')"
        
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

    if [ "$2" = "--club-delete" ]; then
        TOKEN="$(curl --header "Content-Type: application/json" --request POST --data '{"username":"user","password":"user"}'  http://localhost:4000/api/user/login)"
        
        curl --header "Content-Type: application/json" \
             --request DELETE \
             --data '{"name":"Clube de filosofia classica", "token":'$TOKEN' }' \
             http://localhost:4000/api/club
        exit 1
    fi


    if [ "$2" = "--book-create" ]; then
        TOKEN="$(curl --header "Content-Type: application/json" --request POST --data '{"username":"user","password":"user"}'  http://localhost:4000/api/user/login | jq -r '.token')"
        
        
        curl --header "Content-Type: application/json" \
             --request POST \
             --data '{"title":"o vermelho e o negro","isbn":"00033", "token":"'$TOKEN'" }' \
             http://localhost:4000/api/book
        exit 1
    fi

    if [ "$2" = "--book-update" ]; then
        TOKEN="$(curl --header "Content-Type: application/json" --request POST --data '{"username":"user","password":"user"}'  http://localhost:4000/api/user/login)"
        
        curl --header "Content-Type: application/json" \
             --request PUT \
             --data '{"title":"o vermelho e o negro (versão de bolso)","isbn":"3333" , "targettitle":"o vermelho e o negro", "token":'$TOKEN' }' \
             http://localhost:4000/api/book
        exit 1
    fi    

    if [ "$2" = "--book-delete" ]; then
        TOKEN="$(curl --header "Content-Type: application/json" --request POST --data '{"username":"user","password":"user"}'  http://localhost:4000/api/user/login)"
        
        curl --header "Content-Type: application/json" \
             --request DELETE \
             --data '{"title":"o vermelho e o negro (versão de bolso)", "token":'$TOKEN' }' \
             http://localhost:4000/api/book
        exit 1
    fi


    if [ "$2" = "--list-create" ]; then
        TOKEN="$(curl --header "Content-Type: application/json" --request POST --data '{"username":"user","password":"user"}'  http://localhost:4000/api/user/login)"
        
        curl --header "Content-Type: application/json" \
             --request POST \
             --data '{"name":"lista dos classicos brasileiros", "club_id":1 , "token":'$TOKEN' }' \
             http://localhost:4000/api/list
        exit 1
    fi

    if [ "$2" = "--list-update" ]; then
        TOKEN="$(curl --header "Content-Type: application/json" --request POST --data '{"username":"user","password":"user"}'  http://localhost:4000/api/user/login)"
        
        curl --header "Content-Type: application/json" \
             --request PUT \
             --data '{"name":"classicos brasileiros", "targetname":"lista dos classicos brasileiros", "token":'$TOKEN' }' \
             http://localhost:4000/api/list
        exit 1
    fi

    if [ "$2" = "--list-delete" ]; then
        TOKEN="$(curl --header "Content-Type: application/json" --request POST --data '{"username":"user","password":"user"}'  http://localhost:4000/api/user/login)"
        
        curl --header "Content-Type: application/json" \
             --request DELETE \
             --data '{"name":"classicos brasileiros", "token":'$TOKEN' }' \
             http://localhost:4000/api/list
        exit 1
    fi


    if [ "$2" = "--review-create" ]; then
        TOKEN="$(curl --header "Content-Type: application/json" --request POST --data '{"username":"user","password":"user"}'  http://localhost:4000/api/user/login)"
        
        curl --header "Content-Type: application/json" \
             --request POST \
             --data '{"user_id":1, "book_id":2, "rating":9.9 ,"commentary":"o melhor livro existencialista já escrito, dostoievsky é um genio", "token":'$TOKEN' }' \
             http://localhost:4000/api/review
        exit 1
    fi


    if [ "$2" = "--review-update" ]; then
        TOKEN="$(curl --header "Content-Type: application/json" --request POST --data '{"username":"user","password":"user"}'  http://localhost:4000/api/user/login)"
        
        curl --header "Content-Type: application/json" \
             --request PUT \
             --data '{"user_id":1, "book_id":2, "rating":7.9 ,"commentary":" pensando melhor, apenas as partes do rodion são boas", "token":'$TOKEN' }' \
             http://localhost:4000/api/review
        exit 1
    fi

    if [ "$2" = "--review-delete" ]; then
        TOKEN="$(curl --header "Content-Type: application/json" --request POST --data '{"username":"user","password":"user"}'  http://localhost:4000/api/user/login)"
        
        curl --header "Content-Type: application/json" \
             --request DELETE \
             --data '{"user_id":1 , "book_id":2, "token":'$TOKEN' }' \
             http://localhost:4000/api/review
        exit 1
    fi


fi
