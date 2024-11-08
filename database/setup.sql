CREATE DATABASE IF NOT EXISTS bookBridgeDB;

DROP USER IF EXISTS 'bookUser'@'localhost';
CREATE USER 'bookUser'@'localhost' IDENTIFIED BY 'bookUser';

GRANT ALL PRIVILEGES ON bookBridgeDB.* TO 'bookUser'@'localhost';
FLUSH PRIVILEGES;

USE bookBridgeDB;

DROP TABLE IF EXISTS users, books, clubs, membership, reviews, readlist, compose;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    CHECK (CHAR_LENGTH(email) > 3)
);

CREATE TABLE books (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    isbn VARCHAR(255) UNIQUE
);

CREATE TABLE clubs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    description VARCHAR(2000)
);

CREATE TABLE reviews (
    user_id INT,
    book_id INT,
    rating DECIMAL(2,1),
    commentary VARCHAR(2000),
    PRIMARY KEY (user_id, book_id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (book_id) REFERENCES books(id)
);

CREATE TABLE membership (
    user_id INT,
    club_id INT,
    PRIMARY KEY (user_id, club_id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (club_id) REFERENCES clubs(id)
);

CREATE TABLE readlist (
    name VARCHAR(255),
    date_created DATETIME,
    club_id INT,
    PRIMARY KEY (date_created, club_id),
    FOREIGN KEY (club_id) REFERENCES clubs(id)
);

CREATE TABLE compose (
    list_date DATETIME,
    list_id INT,
    book_id INT,
    
    PRIMARY KEY (list_date, list_id, book_id),
    FOREIGN KEY (list_date) REFERENCES readlist(date_created),
    FOREIGN KEY (list_id) REFERENCES readlist(club_id),
    FOREIGN KEY (book_id) REFERENCES books(id)
);
