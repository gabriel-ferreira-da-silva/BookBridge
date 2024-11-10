const mysql = require('mysql2');
const bcrypt = require('bcrypt');

require('dotenv').config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

const users = [
  { name: 'user', username: 'user', email: 'user', password: 'user' },
  { name: 'pedro', username: 'pedro_user', email: 'pedro@gmail', password: 'pedro' },
  { name: 'davi', username: 'davi_user', email: 'davi@gmail', password: 'davi' },
  { name: 'lucas', username: 'lucas_user', email: 'lucas@gmail', password: 'lucas' },
  
  { name: 'maria', username: 'maria_user', email: 'maria@gmail', password: 'maria' },
  { name: 'julia', username: 'julia_user', email: 'julia@gmail', password: 'julia' },
  { name: 'clara', username: 'clara_user', email: 'clara@gmail', password: 'clara' },

  { name: 'alice', username: 'alice_user', email: 'alice@gmail', password: 'alice' },
  { name: 'caio', username: 'caio_user', email: 'caio@gmail', password: 'caio' },
  { name: 'eduarda', username: 'eduarda_user', email: 'eduarda@gmail', password: 'eduarda' },

];


const insertUsers = async () => {
  try {

    db.connect(err => {
      if (err) {
        console.error('Database connection failed:', err);
        return;
      }
      console.log('Connected to the database');
    });

    for (const user of users) {
      const hashedPassword = await bcrypt.hash(user.password, 10); // 10 is the salt rounds

      const query = 'INSERT INTO users (name, username, email, password) VALUES (?, ?, ?, ?)';
      db.query(query, [user.name, user.username, user.email, hashedPassword], (err, results) => {
        if (err) {
          console.error('Error inserting user:', err);
        } else {
          console.log(`User ${user.username} inserted successfully`);
        }
      });
    }

    db.end();
  } catch (error) {
    console.error('Error:', error);
  }
};

insertUsers();
