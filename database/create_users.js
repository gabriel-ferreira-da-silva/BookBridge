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
