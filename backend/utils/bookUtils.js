const db = require('../modules/database/database');
const cache = require('../modules/cache/cache')


const fetchAllFromDatabase = () => {
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

const fetchAllFromCache = () => {
  return new Promise(async (resolve, reject) => {
    const cacheKey = 'all_books';
    cache.get(cacheKey, async (err, data) => {
      if (err) {
        console.error("Redis error:", err);
        return reject(err);
      }

      if (data) {
        return resolve(JSON.parse(data));
      }

      return resolve(null);
    });
  });
};

const fetchAll = ()=>{
  return new Promise( async(resolve,  reject)=>{
    try {
      
      const cacheResults = await fetchAllFromCache();
      
      if(cacheResults) return resolve(cacheResults);
      
      const results = await fetchAllFromDatabase();
      const cacheKey = 'all_books';

      cache.setex(cacheKey, 3600, JSON.stringify(results));
      return resolve(results);

    } catch (error) {
      console.error("Error in fetchAll:", error);
      reject(error);
    }
  })
}


const fetchFromDatabase = (title) =>{
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

const fetchFromCache = (title) => {
  return new Promise(async (resolve, reject) => {
    
    const cacheKey = 'book:'+title;

    cache.get(cacheKey, async (err, data) => {
      if (err) {
        console.error("Redis error:", err);
        return reject(err);
      }

      if (data) {
        return resolve(JSON.parse(data));
      }

      return resolve(null);
    });
  });
};

const fetch= (title)=>{
  return new Promise( async(resolve,  reject)=>{
    try {
      
      const cacheResults = await fetchFromCache(title);
      
      if(cacheResults) return resolve(cacheResults);
      
      const results = await fetchFromDatabase(title);
      
      const cacheKey = 'books:'+title;

      cache.setex(cacheKey, 3600, JSON.stringify(results));
      return resolve(results);

    } catch (error) {
      console.error("Error in fetchAll:", error);
      reject(error);
    }
  })
}


const post = (title, isbn) => {
  return new Promise((resolve, reject) => {
      const query = 'INSERT INTO books (title, isbn) VALUES (?,?)';

      db.query(query, [title, isbn], (dbErr, results) => {
      
      if (dbErr) return reject(dbErr);
      
      resolve({ results: results, status: 201 });
      
      });
  });
};

const put = (title, isbn, target) => {
  return new Promise((resolve, reject) => {
      
      const query = 'UPDATE books SET title = ?, isbn = ? WHERE title = ?';


      db.query(query, [title, isbn ,  target], (dbErr, results) => {
      
      if (dbErr) return reject(dbErr);

      cache.del('all_books');  

      resolve({ results:results, status: 201 });
      
      });
  });
};


const remove = (title) => {
  return new Promise((resolve, reject) => {
      
      const query = 'DELETE FROM books WHERE title = ?';

      db.query(query, [title], (dbErr, results) => {
        
        if (dbErr) return reject(dbErr);
        
        resolve({ results: results, status: 201 });
      
      });

      cache.del(`all_books`); 
      cache.del(`book:${title}`); 
  });
};



module.exports = {  remove,fetchAll, fetch, post, put}