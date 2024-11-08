const express = require('express');
const mysql = require('mysql2');
const router = express.Router();
require('dotenv').config();

const db = require('../utils/databaseUtils');
const Club = require('../utils/clubUtils');

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

router.get('/club', async (req, res) => {
  try {
    
    const results = await Club.fetchAll(); 
    res.json(results);

  } catch (error) {
    
    res.status(500).send('Server error: ' + error.message);
  
  }
});


router.get('/club/name/:name', async (req, res) => {
  try {
    const {name} = req.params;
    const results = await Club.fetch(name); 
    res.json(results);

  } catch (error) {
    
    res.status(500).send('Server error: ' + error.message);
  
  }
});

module.exports = router;