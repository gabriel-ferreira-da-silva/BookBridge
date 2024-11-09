const express = require('express');
const mysql = require('mysql2');
const router = express.Router();
require('dotenv').config();

const db = require('../modules/database/database');
const Review = require('../utils/reviewUtils');
const Auth= require('../utils/authUtils');

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

router.get('/review', async (req, res) => {
  try {
    
    const results = await Review.fetchAll(); 
    res.json(results);

  } catch (error) {
    
    res.status(500).send('Server error: ' + error.message);
  
  }
});


router.get('/review/byUser/:user_id', async (req, res) => {
  try {

    const {user_id} = req.params;
    const results = await Review.fetchByUser(user_id); 
    res.json(results);

  } catch (error) {
    
    res.status(500).send('Server error: ' + error.message);
  
  }
});


router.get('/review/byBook/:book_id', async (req, res) => {
  try {

    const {book_id} = req.params;
    const results = await Review.fetchByBook(book_id); 
    res.json(results);

  } catch (error) {
    
    res.status(500).send('Server error: ' + error.message);
  
  }
});



router.post('/review', async (req, res) => {
  const {user_id, book_id, rating, commentary, token} = req.body;
  const isAuthorized = await Auth.verifyToken(token);
  
  if(isAuthorized == false){
    res.status(500).send("authentication failed. are you registered?");
    return;
  }

  try {
    
    const result = await Review.post(user_id, book_id, rating, commentary)
    res.status(201).json(result);

  } catch (error) {
    
    console.error("Error creating club:", error);
    res.status(500).send("Server error: " + error.message);
  
  }
});


router.put('/review', async (req, res) => {
  const { user_id,book_id,rating, commentary, token } = req.body;
  const isAuthorized = await Auth.verifyToken(token);
  
  if(isAuthorized == false){
    res.status(500).send("authentication failed. are you registered?");
    return;
  }

  try {
    
    const result = await Review.put(user_id,book_id,rating, commentary);
    res.status(201).json(result);

  } catch (error) {
    
    console.error("Error updating club:", error);
    res.status(500).send("Server error: " + error.message);
  
  }
});



router.delete('/review', async (req, res) => {
  const { user_id,book_id, token } = req.body;
  const isAuthorized = await Auth.verifyToken(token);
  
  if(isAuthorized == false){
    res.status(500).send("authentication failed. are you registered?");
    return;
  }

  try {
    
    const result = await Review.remove(user_id, book_id);
    res.status(201).json(result);

  } catch (error) {
    
    console.error("Error updating club:", error);
    res.status(500).send("Server error: " + error.message);
  
  }
});

module.exports = router;