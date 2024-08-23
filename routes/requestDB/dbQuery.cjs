const pool = require('./db.cjs');

const executeQuery = (query, params) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        reject(err);
        return;
      }
      connection.query(query, params, (queryErr, rows) => {
        connection.release();
        if (queryErr) {
          reject(queryErr);
          return;
        }
        resolve(rows);
      });
    });
  });
};

module.exports = executeQuery;