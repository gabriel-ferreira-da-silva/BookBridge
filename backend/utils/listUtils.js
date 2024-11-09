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
      db.query('SELECT * FROM readlist', (err, results) => {
          
          if (err) return reject(err);

          resolve(results);

      });
  });
};

const fetch = (name) =>{
  return new Promise((resolve, reject)=>{
    const query = 'SELECT * FROM readlist WHERE name = ?';
    db.query(query, [name], (err, results) => {
        if (err) {
            reject(err);
        }
        resolve(results[0]);
    });       
  })
}

const post = (name, club_id) => {
  return new Promise((resolve, reject) => {
    const date_created = new Date().toISOString().slice(0, 19).replace('T', ' ');
      const query = 'INSERT INTO readlist (name,date_created, club_id ) VALUES (?,?,?)';

      db.query(query, [name, date_created, club_id], (dbErr, results) => {
      
      if (dbErr) return reject(dbErr);
      
      resolve({ results:results, status: 201 });
      
      });
  });
};

const put = (name, targetname) => {
  return new Promise((resolve, reject) => {
      
      const query = 'UPDATE readlist SET name = ? WHERE name = ?';


      db.query(query, [ name, targetname], (dbErr, results) => {
      
      if (dbErr) return reject(dbErr);
      
      resolve({ results:results, status: 201 });
      
      });
  });
};


const remove = (name) => {
  return new Promise((resolve, reject) => {
      
      const query = 'DELETE FROM readlist WHERE name = ? ';

      db.query(query, [name], (dbErr, results) => {
        
        if (dbErr) return reject(dbErr);
        
        resolve({ results:results, status: 201 });
      
      });
  });
};

const getListsOfClub = (club_id) =>{
  return new Promise((resolve, reject) => {
      
    const query = 'select * from readlist where list_id = ?';

    db.query(query, [list_id], (dbErr, results) => {
      
      if (dbErr) return reject(dbErr);
      
      resolve({ results: results , status: 201 });
    
    });
  });
}

const getBooksOfList = (list_date, list_id) =>{
  return new Promise((resolve, reject) => {
      
    const query = 'select book_id from compose where list_date = ? list_id = ?';

    db.query(query, [list_date, list_id], (dbErr, results) => {
      
      if (dbErr) return reject(dbErr);
      
      resolve({ results: results , status: 201 });
    
    });
  });
}


const addBookToList = (book_id, list_date, list_id) =>{
  return new Promise((resolve, reject) => {
      
    const query = 'INSERT INTO compose (list_date, list_id, book_id) values (?,?,?)';

    db.query(query, [list_date, list_id, book_id], (dbErr, results) => {
      
      if (dbErr) return reject(dbErr);
      
      resolve({ results:results, status: 201 });
    
    });
  });
}


const removeBookFromList = (book_id, list_date, list_id) =>{
  return new Promise((resolve, reject) => {
      
    const query = 'DELETE FROM compose WHERE list_date = ? and list_id = ? and book_id = ?';

    db.query(query, [list_date, list_id, book_id], (dbErr, results) => {
      
      if (dbErr) return reject(dbErr);
      
      resolve({ results:results, status: 201 });
    
    });
  });
}


module.exports = { remove,fetchAll, fetch, post, put}