const express = require('express');
const router = express.Router();
require('dotenv').config();

const db = require('../modules/database/database');
const Auth = require('../utils/authUtils');
const List = require('../utils/listUtils');

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
    return;
  }
  console.log('Connected to MySQL database');
});


router.get('/list', async (req, res) => {
  try {
    
    const results = await List.fetchAll(); 
    res.json(results);

  } catch (error) {
    
    res.status(500).send('Server error: ' + error.message);
  
  }
});


router.get('/list/name/:name', async (req, res) => {
  try {

    const {name} = req.params;
    const results = await List.fetch(name); 
    res.json(results);

  } catch (error) {
    
    res.status(500).send('Server error: ' + error.message);
  
  }
});


router.post('/list', async (req, res) => {
  const { name, club_id,  token } = req.body;
  const isAuthorized = await Auth.verifyToken(token);
  
  if(isAuthorized == false){
    res.status(500).send("authentication failed. are you registered?");
    return;
  }

  try {
    
    const result = await List.post(name, club_id);
    res.status(201).json(result);

  } catch (error) {
    
    console.error("Error creating book:", error);
    res.status(500).send("Server error: " + error.message);
  
  }
});


router.put('/list', async (req, res) => {
  const { name, token,targetname } = req.body;
  const isAuthorized = await Auth.verifyToken(token);
  
  if(isAuthorized == false){
    res.status(500).send("authentication failed. are you registered?");
    return;
  }

  try {
    
    const result = await List.put(name, targetname);
    res.status(201).json(result);

  } catch (error) {
    
    console.error("Error updating club:", error);
    res.status(500).send("Server error: " + error.message);
  
  }
});


router.delete('/list', async (req, res) => {
  const { name, token } = req.body;
  const isAuthorized = await Auth.verifyToken(token);
  
  if(isAuthorized == false){
    res.status(500).send("authentication failed. are you registered?");
    return;
  }

  try {
    
    const result = await List.remove(name);
    res.status(201).json(result);

  } catch (error) {
    
    console.error("Error updating club:", error);
    res.status(500).send("Server error: " + error.message);
  
  }
});




router.get('/list/book/:list_id/:list_date/:token', async (req, res) => {
  const { list_id,list_date, token } = req.params;
  const isAuthorized = await Auth.verifyToken(token);
  
  if(isAuthorized == false){
    res.status(500).send("authentication failed. are you registered?");
    return;
  }

  try {
    
    const result = await List.getBooksOfList(list_date, list_id);
    res.status(201).json(result);

  } catch (error) {
    
    console.error("Error updating club:", error);
    res.status(500).send("Server error: " + error.message);
  
  }
});


router.post('/list/book/', async (req, res) => {
  const { list_id,list_date,book_id,  token } = req.body;
  const isAuthorized = await Auth.verifyToken(token);
  
  if(isAuthorized == false){
    res.status(500).send("authentication failed. are you registered?");
    return;
  }

  try {
    
    const result = await List.addBookToList( book_id, list_date, list_id);
    res.status(201).json(result);

  } catch (error) {
    
    console.error("Error updating club:", error);
    res.status(500).send("Server error: " + error.message);
  
  }
});


router.delete('/list/book/', async (req, res) => {
  const { list_id,list_date,book_id,  token } = req.body;
  const isAuthorized = await Auth.verifyToken(token);
  
  if(isAuthorized == false){
    res.status(500).send("authentication failed. are you registered?");
    return;
  }

  try {
    
    const result = await List.removeBookFromList( book_id, list_date, list_id);
    res.status(201).json(result);

  } catch (error) {
    
    console.error("Error updating club:", error);
    res.status(500).send("Server error: " + error.message);
  
  }
});


module.exports = router;