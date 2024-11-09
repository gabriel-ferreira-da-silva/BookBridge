const express = require('express');
const router = express.Router();
require('dotenv').config();

const logger = require('../modules/logger/logger')
const Club = require('../utils/clubUtils');
const Auth= require('../utils/authUtils');

router.get('/club', async (req, res) => {
  try {
    
    const results = await Club.fetchAll(); 
    res.json(results);
    logger.info({req,res});

  } catch (error) {
    
    res.status(500).send('Server error: ' + error.message);
    logger.error({req, error});

  }
});


router.get('/club/name/:name', async (req, res) => {
  try {

    const {name} = req.params;
    const results = await Club.fetch(name); 
    res.json(results);
    logger.info({req,res});


  } catch (error) {
    
    res.status(500).send('Server error: ' + error.message);
    logger.error({req, error});

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
    logger.info({req,res});


  } catch (error) {
    
    console.error("Error creating club:", error);
    res.status(500).send("Server error: " + error.message);
    logger.error({req, error});
  
  }
});


router.put('/club', async (req, res) => {
  const { name, description,targetname, token } = req.body;
  const isAuthorized = await Auth.verifyToken(token);
  
  if(isAuthorized == false){
    res.status(500).send("authentication failed. are you registered?");
    return;
  }

  try {
    
    const result = await Club.put(name, description, targetname);
    res.status(201).json(result);
    logger.info({req,res});


  } catch (error) {
    
    console.error("Error updating club:", error);
    res.status(500).send("Server error: " + error.message);
    logger.error({req, error});

  }
});



router.delete('/club', async (req, res) => {
  const { name, token } = req.body;
  const isAuthorized = await Auth.verifyToken(token);
  
  if(isAuthorized == false){
    res.status(500).send("authentication failed. are you registered?");
    return;
  }

  try {
    
    const result = await Club.remove(name);
    res.status(201).json(result);
    logger.info({req,res});

  } catch (error) {
    
    console.error("Error updating club:", error);
    res.status(500).send("Server error: " + error.message);
    logger.error({req, error});

  
  }
});

module.exports = router;