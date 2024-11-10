const db = require('../modules/database/database');
const cache = require('../modules/cache/cache');

const fetchAllFromCache = () => {
  return new Promise(async (resolve, reject) => {
    const cacheKey = 'all_users';
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

const fetchAllFromDatabase = () => {
  return new Promise((resolve, reject) => {
      db.query('SELECT * FROM users', (err, results) => {
          
          if (err) return reject(err);

          resolve(results);

      });
  });
};


const fetchAll = ()=>{
  return new Promise( async(resolve,  reject)=>{
    try {
      
      const cacheResults = await fetchAllFromCache();
      
      if(cacheResults) return resolve(cacheResults);
      
      const results = await fetchAllFromDatabase();
      const cacheKey = 'all_users';

      cache.setex(cacheKey, 3600, JSON.stringify(results));
      return resolve(results);

    } catch (error) {
      console.error("Error in fetchAll:", error);
      reject(error);
    }

  })
}

const verify = (username) =>{
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



const fetchByUsernameFromCache = (username) =>{
  return new Promise(async (resolve, reject) => {
    const cacheKey = 'user:username:'+ username;
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
  
}

const fetchByUsernameFromDatabase = (username) =>{
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

const fetchByUsername = (username) =>{
  return new Promise( async(resolve,  reject)=>{
    try {
      
      const cacheResults = await fetchByUsernameFromCache(username);
      
      if(cacheResults) return resolve(cacheResults);
      
      const results = await fetchByUsernameFromDatabase(username);
      const cacheKey = 'user:username:'+ username;

      cache.setex(cacheKey, 3600, JSON.stringify(results));
      return resolve(results);

    } catch (error) {
      console.error("Error in fetchAll:", error);
      reject(error);
    }
  })
}



const post = (name, username, email, password) => {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO users (name, username, email, password) VALUES (?,?,?,?)';

        db.query(query, [name, username, email, password], (dbErr, results) => {
        
        if (dbErr) return reject(dbErr);
        

        cache.del('all_users');
        
        resolve({results:results, status: 201 });
        
        });
    });
};


  const put = (username, name, email, password) => {
    return new Promise((resolve, reject) => {

      const query = 'UPDATE users SET name = ?, email = ?, password = ? WHERE username = ?';
  
      db.query(query, [name, email, password, username], (dbErr, results) => {
        if (dbErr) return reject(dbErr);  
        
        if (results.affectedRows === 0) {
          return reject(new Error('No user found with that username')); 
        }

        cache.del('all_users');
        cache.del('user:username:'+username);
        
        resolve({ results:results, status: 200 });
      });
    });
  };

  const remove = (username) => {
    return new Promise((resolve, reject) => {

      const query = 'DELETE FROM users WHERE users.username = ?;';
  
      db.query(query, [username], (dbErr, results) => {
        if (dbErr) return reject(dbErr); 
        
        if (results.affectedRows === 0) {
          return reject(new Error('No user found with that username')); 
        }

        cache.del('all_users');
        cache.del('user:username:'+username);
        
        resolve({status: 200 });
      });
    });
  };

  
  
  module.exports = {remove, fetchByUsername, fetchAll,put, post, verify};