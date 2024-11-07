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

router.get('/club', (req, res) => {
  db.query('SELECT * FROM clubs', (err, results) => {
    if (err) {
      res.status(500).send('Server error');
      return;
    }
    res.json(results);
  });
});

module.exports = router;