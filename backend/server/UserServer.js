const express = require('express');
const mysql = require('mysql2');
const router = express.Router();
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
  const { name, username, email, password} = req.body;
  const query = 'INSERT INTO users (name, username, email, password) VALUES (?,?,?,?)';
  db.query(query, [name, username, email, password], (err, results) => {
    if (err) {
      res.status(500).send('Server error' + err);
      return;
    }
    res.status(201).json({ id: results.insertId, name, username, email, password });
  });
});


module.exports = router;