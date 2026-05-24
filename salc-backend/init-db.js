const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

async function initDb() {
  console.log('Starting database initialization on Aiven...');
  
  // Ambil konfigurasi dari .env
  const config = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    // Hubungkan ke 'defaultdb' dulu karena 'salc_db' belum dibuat
    database: 'defaultdb', 
    ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : undefined,
    multipleStatements: true // Diperlukan untuk mengeksekusi seluruh isi file SQL sekaligus
  };

  if (!config.host || !config.user || !config.password) {
    console.error('Error: Kredensial database di .env belum lengkap.');
    process.exit(1);
  }

  let connection;
  try {
    console.log(`Menghubungkan ke ${config.host}:${config.port}...`);
    connection = await mysql.createConnection(config);
    console.log('Koneksi berhasil terhubung!');

    // Baca file database.sql
    const sqlFilePath = path.join(__dirname, 'database.sql');
    if (!fs.existsSync(sqlFilePath)) {
      throw new Error(`File ${sqlFilePath} tidak ditemukan.`);
    }

    console.log('Membaca file database.sql...');
    let sqlContent = fs.readFileSync(sqlFilePath, 'utf8');

    console.log('Mengeksekusi skema database (membuat database & tabel-tabel)...');
    await connection.query(sqlContent);
    console.log('Eksekusi SQL berhasil! Seluruh tabel dan data awal telah dibuat.');

    // Update DB_NAME di file .env menjadi 'salc_db' agar backend terhubung ke database yang benar
    const envPath = path.join(__dirname, '.env');
    if (fs.existsSync(envPath)) {
      let envContent = fs.readFileSync(envPath, 'utf8');
      if (envContent.includes('DB_NAME=defaultdb')) {
        envContent = envContent.replace('DB_NAME=defaultdb', 'DB_NAME=salc_db');
        fs.writeFileSync(envPath, envContent, 'utf8');
        console.log('File .env berhasil diperbarui: DB_NAME diubah menjadi "salc_db".');
      }
    }

  } catch (error) {
    console.error('Terjadi kesalahan saat inisialisasi database:', error.message);
  } finally {
    if (connection) {
      await connection.end();
      console.log('Koneksi ditutup.');
    }
  }
}

initDb();
