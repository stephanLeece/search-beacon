-- psql -f sql/setup.sql finalproject


DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS userProfile;
DROP TABLE IF EXISTS messages;
DROP TABLE IF EXISTS convo;


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
    senderId INTEGER,
    senderFname text,
    senderLname text,
    senderImage text,
    recevierId INTEGER,
    receiverFname text,
    receiverLname text,
    receiverImage text,
    message text,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



CREATE TABLE convo(
  id SERIAL PRIMARY KEY,
  senderId INTEGER,
  senderFname text,
  senderLname text,
  senderImage text,
  recevierId INTEGER,
  receiverFname text,
  receiverLname text,
  receiverImage text,
  latest text,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
