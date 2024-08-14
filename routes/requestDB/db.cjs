const mysql = require('mysql');
const conn = mysql.createConnection({
  host: process.env.VITE_DB_HOST,
  user: process.env.VITE_DB_USER,
  password: process.env.VITE_DB_PASS,
  database: process.env.VITE_DB_SCHEMA,
  multipleStatements: true,
});
// conn.connect();
conn.connect(function(err) {
  if (err) {
    console.error('Error connecting to database: ' + err.stack);
    return;
  }
  // console.log('Connected to database as ID ' + conn.threadId);
});

module.exports = conn;