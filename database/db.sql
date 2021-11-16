CREATE DATABASE database_links;

USE database_links;

CREATE TABLE users (
    id INT(11) NOT NULL,
    link VARCHAR(40) NOT NULL,
    passport VARCHAR(40) NOT NULL,
    full_name VARCHAR(40) NOT NULL,
    PRIMARY KEY (id)
);

ALTER TABLE users
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

DESCRIBE users;

CREATE TABLE links (
    id INT(11) NOT NULL,
    title VARCHAR(150) NOT NULL,
    url VARCHAR(255) NOT NULL,
    description TEXT,
    created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    user_id INT(11),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

ALTER TABLE links
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;