require('dotenv').config();
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  uri: process.env.CONNECTION_STRING, 
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;