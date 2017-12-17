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
    return db.query(`INSERT INTO userProfile (userid, usertype, image1, image2, image3) VALUES ($1,$2,$3,$3,$3) RETURNING userid`, [results.rows[0].id, results.rows[0].usertype, placeholder]).then(function(results) {
        return results.rows[0].userid;
      })
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
