const express = require('express');
const router = express.Router();
require('dotenv').config();

const Auth = require('../utils/authUtils');
const Book = require('../utils/bookUtils');
const logger =require('../modules/logger/logger');


router.get('/book', async (req, res) => {
  try {
    
    const results = await Book.fetchAll();
    res.json(results);
    logger.info(req);
    
  } catch (error) {
    
    res.status(500).send('Server error: ' + error.message);
    logger.error(req);

  }
});


router.get('/book/title/:title', async (req, res) => {
  try {

    const {title} = req.params;
    const results = await Book.fetch(title); 
    res.status(201).json(results);
    logger.info(req);


  } catch (error) {
    
    res.status(500).send('Server error: ' + error.message);
    logger.error(req);
  
  }
});



router.post('/book', async (req, res) => {
  const { title, isbn, token } = req.body;

  try {
    
    const isAuthorized = await Auth.verifyToken(token);
  
    if(isAuthorized == false){
      res.status(500).send("authentication failed. are you registered?");
      return;
    }

    const result = await Book.post(title, isbn);
    res.status(201).json(result);
    logger.info(req);

  } catch (error) {

    console.error("Error creating book:", error);
    res.status(500).send("Server error: " + error.message);
    logger.error(req);

  }
});


router.put('/book', async (req, res) => {
  const { title, isbn, targettitle, token } = req.body;

  try {

    const isAuthorized = await Auth.verifyToken(token);
  
    if(isAuthorized == false){
      res.status(500).send("authentication failed. are you registered?");
      return;
    }
    
    const result = await Book.put(title, isbn, targettitle);
    res.status(201).json(result);
    logger.info(res);

  } catch (error) {
    
    console.error("Error updating club:", error);
    res.status(500).send("Server error: " + error.message);
    logger.error(req);
  
  }
});

router.delete('/book', async (req, res) => {
  const { title, token } = req.body;

  try {

    const isAuthorized = await Auth.verifyToken(token);
  
    if(isAuthorized == false){
      res.status(500).send("authentication failed. are you registered?");
      return;
    }
  
    
    const result = await Book.remove(title);
    res.status(201).json(result);
    logger.info(res);


  } catch (error) {
    
    console.error("Error updating club:", error);
    res.status(500).send("Server error: " + error.message);
    logger.error(req);
  
  }
});
module.exports = router;