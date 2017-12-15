const fs = require("fs");
const spicedPg = require('spiced-pg');
const db = spicedPg(process.env.DATABASE_URL || 'postgres:Stephan:postgres@localhost:5432/finalproject');
const config = require('./config.json');

module.exports.saveUserDetails = function(first, last, email, hashPass, usertype) {
  return db.query(`INSERT INTO users (fname, lname, email, hashedpass, usertype) VALUES ($1, $2, $3, $4, $5) RETURNING id`, [first || null, last || null, email || null, hashPass || null, usertype || null]).then(function(results) {
      return results.rows[0].id;
    })
};
