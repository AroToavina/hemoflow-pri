const mysql = require('mysql2');
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Tester la connexion
pool.getConnection((err, connection) => {
    if (err) {
        console.error('ERREUR DE CONNEXION MYSQL:', err.message);
    } else {
        console.log('Connecté à la base de données MySQL');
        connection.release();
    }
});

module.exports = pool.promise();
