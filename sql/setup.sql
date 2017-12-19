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


CREATE TABLE userProfile(
    id SERIAL PRIMARY KEY,
    userid INTEGER,
    title VARCHAR(200),
    description text,
    responsibilites text,
    skills text,
    image1 text,
    image2 text,
    image3 text,
    address text,
    lat decimal,
    lng decimal,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE messages(
    id SERIAL PRIMARY KEY,
    sender_id INTEGER,
    recevier_id INTEGER,
    message text,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- generate convo id

CREATE TABLE convo(
  id SERIAL PRIMARY KEY,
  sender_id INTEGER,
  sender_type INTEGER,
  recevier_id INTEGER,
  receiver_type INTEGER,
  latestMessage text,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
