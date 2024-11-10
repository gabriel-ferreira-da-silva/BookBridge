# BookBridge

BookBridge is an API for managing book clubs, supporting endpoints for CRUD operations and managing clubs, users, books, reviews, readlist and etc..

## Depencies

book bridge depends on node.js, mysql and bash.

<div style="display:inline-block;">
    <img src="https://static-00.iconduck.com/assets.00/node-js-icon-454x512-nztofx17.png" alt="Description" style="margin: 20px; width:60px; height: 60px; box-shadow: 5px 5px 10px \#888;">
    <img src="https://png.pngtree.com/png-clipart/20230813/original/pngtree-vector-illustration-of-major-database-format-icon-for-mysql-colorful-vector-picture-image_10582562.png" alt="Description" style="margin: 20px; width:60px; height: 60px; box-shadow: 5px 5px 10px \#888;">
    <img src="https://github.com/gabriel-ferreira-da-silva/gabriel-ferreira-da-silva/blob/main/bash.png?raw=true" alt="Description" style="width:70px; height: 70px;margin: 20px;  box-shadow: 5px 5px 10px \#888;">



​    

## build and run

give execution permission to build.sh and all files inside scripts folder

```bash
chmod +x build.sh
```

Then setup the database and build the API with 

```bash
./build.sh --database --restart
./build.sh --run
```

## Tests

to run the test simply type

```bash
./build.sh --tests
```

or manually restart database, rebuild the API and run:

```bash
npx jest
```

## endpoints

In request.sh file you may find examples of curl request  such as 

```
TOKEN="$(curl --header "Content-Type: application/json" 
              --request POST 
              --data '{"username":"user","password":"user"}' 
              http://localhost:4000/api/user/login 
              | jq -r '.token')"
          
curl --header "Content-Type: application/json" \
     --request POST \
     --data '{"title":"o vermelho e o negro","isbn":"00033", "token":"'$TOKEN'" }' \
     http://localhost:4000/api/book
```

you can execute it and other endpoints with build:

```
./build.sh --request --user-create
./build.sh --request --user-login
```

