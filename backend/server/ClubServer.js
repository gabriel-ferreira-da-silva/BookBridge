const express = require('express');
const mysql = require('mysql2');
const router = express.Router();
require('dotenv').config();

const db = require('../utils/databaseUtils');
const Club = require('../utils/clubUtils');
const Auth= require('../utils/authUtils');

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



router.post('/club', async (req, res) => {
  const { name, description, token } = req.body;
  const isAuthorized = await Auth.verifyToken(token);
  
  if(isAuthorized == false){
    res.status(500).send("authentication failed. are you registered?");
    return;
  }

  try {
    
    const result = await Club.post(name, description);
    res.status(201).json(result);

  } catch (error) {
    
    console.error("Error creating club:", error);
    res.status(500).send("Server error: " + error.message);
  
  }
});

module.exports = router;