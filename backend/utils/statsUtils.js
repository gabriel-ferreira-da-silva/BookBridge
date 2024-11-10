const db = require('../modules/database/database');


const getAverageRating = () => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM books', (err, results) => {
      if (err) {
        console.error("Database query error:", err);
        return reject(err);
      }
      resolve(results);
    });
  });
};
