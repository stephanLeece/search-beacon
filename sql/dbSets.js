const fs = require("fs");
const spicedPg = require('spiced-pg');
const db = spicedPg(process.env.DATABASE_URL || 'postgres:Stephan:postgres@localhost:5432/finalproject');
const config = require('./config.json');

module.exports.saveUserDetails = function(first, last, email, hashPass, usertype) {
  return db.query(`INSERT INTO users (fname, lname, email, hashedpass, usertype) VALUES ($1, $2, $3, $4, $5) RETURNING id,usertype`, [first || null, last || null, email || null, hashPass || null, usertype || null]).then(function(results) {
console.log('userid', results.rows[0].id, 'usertype', results.rows[0].usertype);
let placeholder = '';
if (results.rows[0].usertype == 0) {
  placeholder = 'zPw8bZdswK-3M-7MW0QTbQN-L3LGSRyl.png'
} else {
  placeholder = '8PkYpU3KqHK2uRegWmVQP0fr0196-OJK.png'
}
    return db.query(`INSERT INTO userProfile (userid, image1, image2, image3) VALUES ($1,$2,$3,$4) RETURNING userid`, [results.rows[0].id, placeholder,placeholder,placeholder]).then(function(results) {
        return results.rows[0].userid;
      })
  })
};

module.exports.saveProfile = function(title, description, responsibilites, skills, userid) {
    return db.query(`UPDATE userProfile SET title = $1, description = $2, responsibilites= $3, skills = $4 Where userid = $5`, [title || null, description || null, responsibilites || null, skills || null, userid]).then(function() {
    console.log('success');
  })
};

module.exports.saveMessage = function(message,senderId,recevierId) {
    return db.query(`INSERT INTO messages (message, sender_id, recevier_Id) VALUES ($1,$2,$3)`, [message, senderId, recevierId]).then(function() {
    console.log('message success');
  })
};

module.exports.saveAddress = function(address, lat, lng, userid) {
    return db.query(`UPDATE userProfile SET address = $1, lat = $2, lng= $3 Where userid = $4`, [address || null, lat || null, lng || null, userid]).then(function() {
    console.log('success');
  })
};












module.exports.saveImage = function(imageNo, image, id) {
  return db.query(`UPDATE userProfile SET ${imageNo} = $1 Where id = $2 RETURNING ${imageNo}`, [image, id]).then(function(results) {
    results.rows.forEach(function(row) {
      row.image1 = config.s3Url + row.image1;
      row.image2 = config.s3Url + row.image2;
      row.image3 = config.s3Url + row.image3;
    })
    let imageList = results.rows[0]
    return imageList[imageNo];
  });
};
