const db = require('../modules/database/database');


db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
    return;
  }
  console.log('Connected to MySQL database');
});



const fetchAll = () => {
  return new Promise((resolve, reject) => {
      db.query('SELECT * FROM reviews', (err, results) => {
          
          if (err) return reject(err);

          resolve(results);

      });
  });
};

const fetchByUser = (user_id) =>{
  return new Promise((resolve, reject)=>{
    const query = 'SELECT * FROM reviews WHERE user_id = ?';
    db.query(query, [user_id], (err, results) => {
        if (err) {
            reject(err);
        }
        resolve(results[0]);
    });       
  })
}

const fetchByBook = (book_id) =>{
  return new Promise((resolve, reject)=>{
    const query = 'SELECT * FROM reviews WHERE book_id = ?';
    db.query(query, [book_id], (err, results) => {
        if (err) {
            reject(err);
        }
        resolve(results);
    });       
  })
}

const post = ( user_id,book_id,rating, commentary) => {
  return new Promise((resolve, reject) => {
      const query = 'INSERT INTO reviews (user_id, book_id, rating, commentary) VALUES (?,?,?,?)';

      db.query(query, [user_id,book_id,rating, commentary], (dbErr, results) => {
      
      if (dbErr) return reject(dbErr);
      
      resolve({ results: results, status: 201 });
      
      });
  });
};

const put = (user_id,book_id,rating, commentary) => {
  return new Promise((resolve, reject) => {
      
      const query = 'UPDATE reviews SET rating = ?, commentary = ? WHERE user_id = ? and book_id = ?';


      db.query(query, [rating, commentary, user_id, book_id], (dbErr, results) => {
      
      if (dbErr) return reject(dbErr);
      
      resolve({ results:results ,  status: 201 });
      
      });
  });
};


const remove = (user_id,book_id) => {
  return new Promise((resolve, reject) => {
      
      const query = 'DELETE FROM reviews WHERE user_id = ? and book_id = ?';

      db.query(query, [user_id,book_id], (dbErr, results) => {
      
      if (dbErr) return reject(dbErr);
      
      resolve({ status: 201 });
      
      });
  });
};



module.exports = { fetchByBook, fetchByUser, remove,fetchAll, fetch, post, put}