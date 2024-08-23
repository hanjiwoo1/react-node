const mysql = require('mysql2');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.VITE_DB_HOST,
  user: process.env.VITE_DB_USER,
  password: process.env.VITE_DB_PASS,
  database: process.env.VITE_DB_SCHEMA,
  multipleStatements: true,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

function keepAlive() {
  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error getting connection from pool: ' + err.stack);
      return;
    }
    connection.ping((pingErr) => {
      if (pingErr) {
        console.error('Error pinging database: ' + pingErr.stack);
      }
      connection.release();
    });
  });
}

setInterval(keepAlive, 60 * 1000);

module.exports = pool;