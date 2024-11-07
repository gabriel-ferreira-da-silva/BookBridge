const express = require('express');
const mysql = require('mysql2');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

router.get('/user', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) {
      res.status(500).send('Server error');
      return;
    }
    res.json(results);
  });
});

router.post('/user', (req, res) => {
  const { name, username, email, password, token } = req.body;

  jwt.verify(token, 'privatekey', (err, authorizedData) => {
    if (err) {
      console.log('ERROR: Could not connect to the protected route');
      return res.sendStatus(403);
    } 

    bcrypt.hash(password, 10, (hashErr, hashedPassword) => {
      if (hashErr) {
        res.status(500).send('Error hashing password');
        return;
      }

      const query = 'INSERT INTO users (name, username, email, password) VALUES (?,?,?,?)';
      db.query(query, [name, username, email, hashedPassword], (dbErr, results) => {
        if (dbErr) {
          res.status(500).send('Server error: ' + dbErr);
          return;
        }

        res.status(201).json({ id: results.insertId, name, username, email });
        console.log('SUCCESS: Connected to protected route and user created');
      });
    });
  });
});

router.post('/user/login', (req, res) => {
  const { username, password } = req.body;    
  
  const query = 'SELECT * FROM users WHERE username = ?';
  
  db.query(query, [username], (err, results) => {
    if (err) {
      res.status(500).send("Server error: " + err);
      return;
    }
    
    if (results.length === 0) {
      return res.status(401).json({ message: 'No user found Invalid username or password' });
    }
    
    const user = results[0];
    
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        res.status(500).send("Error checking password: " + err);
        return;
      }
      
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }
      
      jwt.sign({ id: user.id, username: user.username }, 'privatekey', { expiresIn: '1h' }, (err, token) => {
        if (err) {
          res.status(500).send("Error generating token: " + err);
          return;
        }
        
        res.json({ token });
      });
    });
  });
});


module.exports = router;