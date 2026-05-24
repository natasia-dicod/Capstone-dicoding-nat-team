// Script to fix admin password in database
require('dotenv').config();
const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');

async function fixPassword() {
  const conn = await mysql.createConnection({
    host: process.env.DB_HOST.trim(),
    port: parseInt(process.env.DB_PORT),
    user: process.env.DB_USER.trim(),
    password: process.env.DB_PASSWORD.trim(),
    database: process.env.DB_NAME.trim(),
    ssl: {
      rejectUnauthorized: true,
      ca: fs.readFileSync(path.join(__dirname, 'ca.pem')),
    },
  });

  // Generate proper bcrypt hash for 'admin123'
  const hash = await bcrypt.hash('admin123', 10);
  console.log('Generated hash:', hash);

  // Update admin password
  const [result] = await conn.execute(
    'UPDATE users SET password = ? WHERE email = ?',
    [hash, 'admin@salc.id']
  );
  console.log('Rows updated:', result.affectedRows);

  // Verify
  const [rows] = await conn.execute(
    'SELECT id, email, password FROM users WHERE email = ?',
    ['admin@salc.id']
  );
  const user = rows[0];
  console.log('Stored hash:', user.password);
  
  const isMatch = await bcrypt.compare('admin123', user.password);
  console.log('Verification (admin123 matches):', isMatch);

  await conn.end();
  console.log('Done!');
}

fixPassword().catch(console.error);
