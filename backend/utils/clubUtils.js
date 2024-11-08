const db = require('./databaseUtils');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
    return;
  }
  console.log('Connected to MySQL database');
});



const fetchAll = () => {
  return new Promise((resolve, reject) => {
      db.query('SELECT * FROM clubs', (err, results) => {
          
          if (err) return reject(err);

          resolve(results);

      });
  });
};

const fetch = (name) =>{
  return new Promise((resolve, reject)=>{
    const query = 'SELECT * FROM clubs WHERE name = ?';
    db.query(query, [name], (err, results) => {
        if (err) {
            reject(err);
        }
        resolve(results[0]);
    });       
  })
}

module.exports = { fetchAll, fetch}