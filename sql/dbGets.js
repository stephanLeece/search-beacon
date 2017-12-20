const fs = require("fs");
const spicedPg = require('spiced-pg');
const db = spicedPg(process.env.DATABASE_URL || 'postgres:Stephan:postgres@localhost:5432/finalproject');
const config = require('./config.json');

module.exports.getUserByEmail = function(email) {
  return db.query(`SELECT * FROM users
    JOIN userProfile ON (users.id = userProfile.userid)
    WHERE users.email = $1`, [email]).then(function(results) {
    return results.rows[0];
  })
};

module.exports.getUserById = function(id) {
  return db.query(`SELECT * FROM users
    JOIN userProfile ON (users.id = userProfile.userid)
    WHERE users.id = $1`, [id]).then(function(results) {
    if (!results.rows[0]) {
      return 0
    } else {
      results.rows.forEach(function(row) {
        row.image1 = config.s3Url + row.image1;
        row.image2 = config.s3Url + row.image2;
        row.image3 = config.s3Url + row.image3;
      })
      return results.rows[0];
    }
  })
};

module.exports.getAllUsers = function(aNum) {
  return db.query(`SELECT * FROM users
    JOIN userProfile ON (users.id = userProfile.userid)
    WHERE usertype = $1`, [aNum]).then(function(results) {
    results.rows.forEach(function(row) {
      row.image1 = config.s3Url + row.image1;
      row.image2 = config.s3Url + row.image2;
      row.image3 = config.s3Url + row.image3;
    })
    return results.rows;
  })
};

module.exports.getUserProfile = function(userid) {
  return db.query(`SELECT * FROM userProfile WHERE userid = $1`, [userid]).then(function(results) {
    results.rows.forEach(function(row) {
      row.image1 = config.s3Url + row.image1;
      row.image2 = config.s3Url + row.image2;
      row.image3 = config.s3Url + row.image3;
    })
    return results.rows[0];
  })
};


module.exports.search = function(aTerm, anId, aType) {
  return db.query(`SELECT * FROM users
    JOIN userProfile ON (users.id = userProfile.userid AND users.usertype <> $1 AND users.id <> $2)
    WHERE (to_tsvector('english', userProfile.skills) @@ to_tsquery('english', '${aTerm}'))
    OR (to_tsvector('english', userProfile.title) @@ to_tsquery('english', '${aTerm}'))
    OR (to_tsvector('english', userProfile.description) @@ to_tsquery('english', '${aTerm}'))
    OR (to_tsvector('english', userProfile.responsibilites) @@ to_tsquery('english', '${aTerm}'));`, [anId, aType]).then(function(results) {
    if (!results.rows[0]) {
      return 0
    } else {
      results.rows.forEach(function(row) {
        row.image1 = config.s3Url + row.image1;
        row.image2 = config.s3Url + row.image2;
        row.image3 = config.s3Url + row.image3;
      })
      return results.rows;
    }
  })
};


module.exports.getConvo = function(senderId, recevierId) {
  return db.query(`SELECT * FROM messages WHERE senderId = $1 AND recevierId = $2 OR senderId = $2 AND recevierId = $1`, [senderId, recevierId]).then(function(results) {
    if (!results.rows[0]) {
      return 0
    } else {
      results.rows.forEach(function(row) {
        row.image1 = config.s3Url + row.image1;
        row.image2 = config.s3Url + row.image2;
        row.image3 = config.s3Url + row.image3;
      })
      return results.rows;
    }
  })
};
