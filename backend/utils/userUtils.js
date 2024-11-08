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
  


const fetchAllUsers = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM users', (err, results) => {
            
            if (err) return reject(err);

            resolve(results);

        });
    });
};


const verifyUser = (username) =>{
    return new Promise((resolve, reject)=>{
        const query = 'SELECT * FROM users WHERE username = ?';
        db.query(query, [username], (err, results) => {

            if (err) {
                reject(err);
            }
            
            if (results.length === 0) {
              reject("no user found");
            }
            
            resolve(results[0]);
        });
        
    })
}



const postUser = (name, username, email, password) => {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO users (name, username, email, password) VALUES (?,?,?,?)';
  
      db.query(query, [name, username, email, password], (dbErr, results) => {
        
        if (dbErr) return reject(dbErr);
        
        resolve({ id: results.insertId, name, username, email, status: 201 });
      
        });
    });
  };
  

  
  
  module.exports = { fetchAllUsers, postUser, verifyUser};