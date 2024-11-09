const express = require('express');
const mysql = require('mysql2');
const router = express.Router();
require('dotenv').config();

const logger = require('../modules/logger/logger');
const Review = require('../utils/reviewUtils');
const Auth= require('../utils/authUtils');



router.get('/review', async (req, res) => {
  try {
    
    const results = await Review.fetchAll(); 
    res.json(results);
    logger.info({req,res});

  } catch (error) {
    
    res.status(500).send('Server error: ' + error.message);
    logger.error({req,error});

  }
});


router.get('/review/byUser/:user_id', async (req, res) => {
  try {

    const {user_id} = req.params;
    const results = await Review.fetchByUser(user_id); 
    res.json(results);
    logger.info({req,res});


  } catch (error) {
    
    res.status(500).send('Server error: ' + error.message);
    logger.error({req,error});

  }
});


router.get('/review/byBook/:book_id', async (req, res) => {
  try {

    const {book_id} = req.params;
    const results = await Review.fetchByBook(book_id); 
    res.json(results);
    logger.info({req,res});


  } catch (error) {
    
    res.status(500).send('Server error: ' + error.message);
    logger.error({req,error});

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
    logger.info({req,res});

  } catch (error) {
    
    console.error("Error creating club:", error);
    res.status(500).send("Server error: " + error.message);
    logger.error({req,error});
  
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
    logger.info({req,res});

  } catch (error) {
    
    console.error("Error updating club:", error);
    res.status(500).send("Server error: " + error.message);
    logger.error({req,error});

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
    logger.info({req,res});

  } catch (error) {
    
    console.error("Error updating club:", error);
    res.status(500).send("Server error: " + error.message);
    logger.error({req,error});
  
  }
});

module.exports = router;