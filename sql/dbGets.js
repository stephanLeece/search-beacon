const fs = require("fs");
const spicedPg = require('spiced-pg');
const db = spicedPg(process.env.DATABASE_URL || 'postgres:Stephan:postgres@localhost:5432/finalproject');
const config = require('./config.json');

module.exports.getUserByEmail = function(email) {
  return db.query(`SELECT * FROM users WHERE email = $1`, [email]).then(function(results) {
    return results.rows[0];
  })
};
