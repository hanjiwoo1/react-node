const conn = require("./db.cjs");

const executeQuery = (query) => {
  return new Promise((resolve, reject) => {
    conn.query(query, (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(rows);
    });
  });
};
module.exports = executeQuery;