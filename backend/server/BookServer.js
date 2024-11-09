const express = require('express');
const router = express.Router();
require('dotenv').config();

const Auth = require('../utils/authUtils');
const Book = require('../utils/bookUtils');


router.get('/book', async (req, res) => {
  try {
    
    const results = await Book.fetchAll(); 
    res.json(results);

  } catch (error) {
    
    res.status(500).send('Server error: ' + error.message);
  
  }
});


router.get('/book/title/:title', async (req, res) => {
  try {

    const {title} = req.params;
    const results = await Book.fetch(title); 
    res.json(results);

  } catch (error) {
    
    res.status(500).send('Server error: ' + error.message);
  
  }
});



router.post('/book', async (req, res) => {
  const { title, isbn, token } = req.body;
  const isAuthorized = await Auth.verifyToken(token);
  
  if(isAuthorized == false){
    res.status(500).send("authentication failed. are you registered?");
    return;
  }

  try {
    
    const result = await Book.post(title, isbn);
    res.status(201).json(result);

  } catch (error) {
    
    console.error("Error creating book:", error);
    res.status(500).send("Server error: " + error.message);
  
  }
});


router.put('/book', async (req, res) => {
  const { title, isbn, targettitle, token } = req.body;
  const isAuthorized = await Auth.verifyToken(token);
  
  if(isAuthorized == false){
    res.status(500).send("authentication failed. are you registered?");
    return;
  }

  try {
    
    const result = await Book.put(title, isbn, targettitle);
    res.status(201).json(result);

  } catch (error) {
    
    console.error("Error updating club:", error);
    res.status(500).send("Server error: " + error.message);
  
  }
});



router.delete('/book', async (req, res) => {
  const { title, token } = req.body;
  const isAuthorized = await Auth.verifyToken(token);
  
  if(isAuthorized == false){
    res.status(500).send("authentication failed. are you registered?");
    return;
  }

  try {
    
    const result = await Book.remove(title);
    res.status(201).json(result);

  } catch (error) {
    
    console.error("Error updating club:", error);
    res.status(500).send("Server error: " + error.message);
  
  }
});
module.exports = router;