if [ "$1" = "--database" ] || [ "$1" = "-d" ]; then
    if [ -z "$2" ]; then
        echo "no database command given"
        exit 1
    fi

    if [ "$2" = "--restart" ] || [ "$2" = "-r" ]; then
        cd ..
        cd database
        sudo mysql -u root < setup.sql
        sudo node create_users.js
        sudo mysql -u root < create_clubs.sql
        echo "database restarted sucessfully"
    fi
fi