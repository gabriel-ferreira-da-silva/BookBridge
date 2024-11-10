const express = require('express');
const router = express.Router();

const logger = require('../modules/logger/logger');
const User = require('../utils/userUtils');
const Auth = require('../utils/authUtils');

require('dotenv').config();

router.get('/user', async (req, res) => {
  try {
    
    const results = await User.fetchAll(); 
    res.json(results);
    logger.info({req,res});

  } catch (error) {
    
    res.status(500).send('Server error: ' + error.message);
    logger.error({req,error});

  }
});

router.get('/user/username/:username', async (req, res) => {
  try {

    const { username } = req.params;
    const results = await User.fetchByUsername(username); 
    res.json(results);
    logger.info({req,res});

  } catch (error) {
    
    res.status(500).send('Server error: ' + error.message);
    logger.error({req,error});
  
  }
});


router.put('/user', async (req, res) => {
  const { name, username, email, password, token } = req.body;
  const hashedPassword = await Auth.hashPassword(password);
  const isAuthorized = await Auth.verifyToken(token);
  
  if(isAuthorized == false){
    res.status(500).send("authentication failed. are you registered?");
    return;
  }

  try {

    const result = await User.put(username, name, email, hashedPassword);
    res.status(201).json({token:result});
    logger.info({req,res});

  } catch (error) {
    
    res.status(500).send("Server error: " + error.message);
    logger.error({req,error});

  }
});


router.delete('/user', async (req, res) => {
  const { username, token } = req.body;
  const isAuthorized = await Auth.verifyToken(token);
  
  if(isAuthorized == false){
    res.status(500).send("authentication failed. are you registered?");
    return;
  }

  try {

    const result = await User.deleteUser(username);
    res.status(201).json(result);
    logger.info({req,res});

  } catch (error) {
    
    console.error("Error deleting  user:", error);
    res.status(500).send("Server error: " + error.message);
    logger.error({req,error});
  
  }
});


router.post('/user', async (req, res) => {
  const { name, username, email, password, token } = req.body;
  const hashedPassword = await Auth.hashPassword(password);
  const isAuthorized = await Auth.verifyToken(token);
  
  if(isAuthorized == false){
    res.status(500).send("authentication failed. are you registered?");
    return;
  }

  try {
    
    const result = await User.postUser(name, username, email, hashedPassword);
    res.status(201).json(result);
    logger.info({req,res});

  } catch (error) {
    
    console.error("Error creating user:", error);
    res.status(500).send("Server error: " + error.message);
    logger.error({req,error});
  
  }
});
    


router.post('/user/login', async (req, res) => {
  
  const { username, password } = req.body;    
  const user = await User.verify(username);
  const passwordIsValid = await Auth.verifyPassword(password, user.password);

  if(passwordIsValid==false || user==null){
    res.status(500).send("error in password or user not registered")
    return;
  }
  
  try{

    const token = await Auth.getToken(user);
    res.status(200).json({token:token});
    logger.info({req,res});
  
  }catch(error){
  
    console.log("error geting and sending token: "+ err);
    logger.error({req,error});

  }

});


module.exports = router;