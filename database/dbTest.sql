CREATE DATABASE database_links_test;

USE database_links_test;

DROP TABLE IF EXISTS links;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    username VARCHAR(60) NOT NULL,
    fullname VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL,
    PRIMARY KEY (username)
);


DESCRIBE users;

CREATE TABLE links (
    id INT(11) NOT NULL,
    title VARCHAR(150) NOT NULL,
    url VARCHAR(255) NOT NULL,
    description TEXT,
    created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    user_id VARCHAR(60),
    FOREIGN KEY (user_id) REFERENCES users(username)
);

ALTER TABLE links
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;