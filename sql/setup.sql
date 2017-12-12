-- psql -f sql/setup.sql finalproject


DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS friend_statuses;


CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    fname VARCHAR(200) NOT NULL,
    lname VARCHAR(200) NOT NULL,
    profilepic text,
    email VARCHAR(200) NOT NULL UNIQUE,
    hashedpass VARCHAR(200) NOT NULL,
    bio text,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE friend_statuses (
id SERIAL PRIMARY KEY,
sender_id INTEGER NOT NULL,
reciever_id INTEGER NOT NULL,
status INTEGER NOT NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP
);
