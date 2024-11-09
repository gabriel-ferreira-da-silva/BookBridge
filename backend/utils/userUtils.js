const db = require('../modules/database/database');

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



const fetchUserByUsername = (username) =>{
    return new Promise((resolve, reject)=>{
        const query = 'SELECT * FROM users WHERE username = ?';
        db.query(query, [username], (err, results) => {
            if (err) {
                reject(err);
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


  const putUser = (username, name, email, password) => {
    return new Promise((resolve, reject) => {

      const query = 'UPDATE users SET name = ?, email = ?, password = ? WHERE username = ?';
  
      db.query(query, [name, email, password, username], (dbErr, results) => {
        if (dbErr) return reject(dbErr);  
        
        if (results.affectedRows === 0) {
          return reject(new Error('No user found with that username')); 
        }
        
        resolve({ id: results.insertId, name, username, email, status: 200 });
      });
    });
  };

  const deleteUser = (username) => {
    return new Promise((resolve, reject) => {

      const query = 'DELETE FROM users WHERE users.username = ?;';
  
      db.query(query, [username], (dbErr, results) => {
        if (dbErr) return reject(dbErr); 
        
        if (results.affectedRows === 0) {
          return reject(new Error('No user found with that username')); 
        }
        
        resolve({status: 200 });
      });
    });
  };

  
  
  module.exports = { deleteUser, fetchUserByUsername, fetchAllUsers,putUser, postUser, verifyUser};