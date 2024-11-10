const db = require('../modules/database/database');

const getNumberOfBooks = () => {
  return new Promise((resolve, reject) => {
    db.query('SELECT getNumberOfBooks()', (err, results) => {
      if (err) {
        console.error("Database query error:", err);
        return reject(err);
      }
      resolve(results); 
    });
  });
};

const getAverageOfRatings = () => {
  return new Promise((resolve, reject) => {
    db.query('SELECT getAverageOfRatings()', (err, results) => {
      if (err) {
        console.error("Database query error:", err);
        return reject(err);
      }
      resolve(results); 
    });
  });
};



const getAverageByBook = () => {
  return new Promise((resolve, reject) => {
    db.query('call getAverageByBook()', (err, results) => {
      if (err) {
        console.error("Database query error:", err);
        return reject(err);
      }
      resolve(results);
    });
  });
};

module.exports = {getAverageByBook, getAverageOfRatings, getNumberOfBooks}
