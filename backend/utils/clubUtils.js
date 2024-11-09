const db = require('../modules/database/database');


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

const post = (name, description) => {
  return new Promise((resolve, reject) => {
      const query = 'INSERT INTO clubs (name, description) VALUES (?,?)';

      db.query(query, [name, description], (dbErr, results) => {
      
      if (dbErr) return reject(dbErr);
      
      resolve({ id: results.insertId, name: results.name , description: results.description,  status: 201 });
      
      });
  });
};

const put = (name,description,target) => {
  return new Promise((resolve, reject) => {
      
      const query = 'UPDATE clubs SET name = ?, description = ? WHERE name = ?';


      db.query(query, [name, description,target], (dbErr, results) => {
      
      if (dbErr) return reject(dbErr);
      
      resolve({ id: results.insertId, name: results.name , description: results.description,  status: 201 });
      
      });
  });
};


const remove = (name) => {
  return new Promise((resolve, reject) => {
      
      const query = 'DELETE FROM clubs WHERE name = ?';


      db.query(query, [name], (dbErr, results) => {
      
      if (dbErr) return reject(dbErr);
      
      resolve({ status: 201 });
      
      });
  });
};



module.exports = { remove,fetchAll, fetch, post, put}