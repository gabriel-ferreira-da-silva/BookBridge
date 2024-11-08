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
      db.query('SELECT * FROM books', (err, results) => {
          
          if (err) return reject(err);

          resolve(results);

      });
  });
};

const fetch = (title) =>{
  return new Promise((resolve, reject)=>{
    const query = 'SELECT * FROM books WHERE title = ?';
    db.query(query, [title], (err, results) => {
        if (err) {
            reject(err);
        }
        resolve(results[0]);
    });       
  })
}

const post = (name, description) => {
  return new Promise((resolve, reject) => {
      const query = 'INSERT INTO books (title, isbn) VALUES (?,?)';

      db.query(query, [title, isbn], (dbErr, results) => {
      
      if (dbErr) return reject(dbErr);
      
      resolve({ id: results.id, title:results.title, isbn:results.isbn,  status: 201 });
      
      });
  });
};

const put = (title, isbn, target) => {
  return new Promise((resolve, reject) => {
      
      const query = 'UPDATE books SET title = ?, isbn = ? WHERE title = ?';


      db.query(query, [title, isbn ,  target], (dbErr, results) => {
      
      if (dbErr) return reject(dbErr);
      
      resolve({ id: results.insertId, title: results.title , isbn: results.isbn,  status: 201 });
      
      });
  });
};


const remove = (title) => {
  return new Promise((resolve, reject) => {
      
      const query = 'DELETE FROM books WHERE title = ?';


      db.query(query, [title], (dbErr, results) => {
        
        if (dbErr) return reject(dbErr);
        
        resolve({ status: 201 });
      
      });
  });
};



module.exports = { remove,fetchAll, fetch, post, put}