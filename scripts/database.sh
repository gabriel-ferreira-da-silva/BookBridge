if [ "$1" = "--database" ] || [ "$1" = "-d" ]; then
    if [ -z "$2" ]; then
        echo "no database command given"
        exit 1
    fi

    if [ "$2" = "--restart" ] || [ "$2" = "-r" ]; then
        cd ..
        cd database
        sudo mysql -u root < setup.sql
        sudo mysql -u root < create_books.sql
        sudo mysql -u root < create_users.sql
        sudo mysql -u root < create_clubs.sql
    fi
fi