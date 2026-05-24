const mysql = require('mysql2/promise');
require('dotenv').config();

const fs = require('fs');
const path = require('path');

const pool = mysql.createPool({
  host: process.env.DB_HOST ? process.env.DB_HOST.trim() : 'localhost',
  user: process.env.DB_USER ? process.env.DB_USER.trim() : 'root',
  password: process.env.DB_PASSWORD ? process.env.DB_PASSWORD.trim() : '',
  database: process.env.DB_NAME ? process.env.DB_NAME.trim() : 'salc_db',
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306,
  ssl: process.env.DB_SSL === 'true' 
    ? {
        rejectUnauthorized: true,
        ca: fs.existsSync(path.join(__dirname, '../../ca.pem')) 
              ? fs.readFileSync(path.join(__dirname, '../../ca.pem')) 
              : undefined
      }
    : undefined,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Test koneksi saat startup
pool.getConnection()
  .then(conn => {
    console.log('MySQL connected successfully');
    conn.release();
  })
  .catch(err => {
    console.error('MySQL connection failed:', err.message);
  });

module.exports = pool;
