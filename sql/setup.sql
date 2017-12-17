-- psql -f sql/setup.sql finalproject


DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS userProfile;
DROP TABLE IF EXISTS messages;


CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    fname VARCHAR(200) NOT NULL,
    lname VARCHAR(200) NOT NULL,
    email VARCHAR(200) NOT NULL UNIQUE,
    hashedpass VARCHAR(200) NOT NULL,
    usertype INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- CREATE TABLE userProfile(
--     id SERIAL PRIMARY KEY,
--     title VARCHAR(200) NOT NULL,
-- location
--     description VARCHAR(200) NOT NULL,
--     tags VARCHAR(200) NOT NULL UNIQUE,
--     image1 VARCHAR(200) NOT NULL,
--     image2 VARCHAR(200) NOT NULL,
--     image3 VARCHAR(200) NOT NULL,
--     usertype INTEGER NOT NULL,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );

-- CREATE TABLE messages(
--     id SERIAL PRIMARY KEY,
--     sender_id VARCHAR(200) NOT NULL,
-- sender_type
-- recevier_id
-- receiver_type
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );
