const express = require('express');
const mysql = require('mysql2');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../utils/databaseUtils');
const User = require('../utils/userUtils');
const Auth = require('../utils/authUtils');

require('dotenv').config();

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
    return;
  }
  console.log('Connected to MySQL database');
});


router.get('/user', async (req, res) => {
  try {
    
    const results = await User.fetchAllUsers(); 
    res.json(results);

  } catch (error) {
    
    res.status(500).send('Server error: ' + error.message);
  
  }
});

router.get('/user/username/:username', async (req, res) => {
  try {

    const { username } = req.params;
    const results = await User.fetchUserByUsername(username); 
    res.json(results);

  } catch (error) {
    
    res.status(500).send('Server error: ' + error.message);
  
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

    const result = await User.putUser(username, name, email, hashedPassword);
    res.status(201).json(result);

  } catch (error) {
    
    console.error("Error creating user:", error);
    res.status(500).send("Server error: " + error.message);
  
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

  } catch (error) {
    
    console.error("Error deleting  user:", error);
    res.status(500).send("Server error: " + error.message);
  
  }
});


router.post('/user', async (req, res) => {
  const { name, username, email, password, token } = req.body;
  const hashedPassword = await User.hashPassword(password);
  const isAuthorized = await Auth.verifyToken(token);
  
  if(isAuthorized == false){
    res.status(500).send("authentication failed. are you registered?");
    return;
  }

  try {
    
    const result = await User.postUser(name, username, email, hashedPassword);
    res.status(201).json(result);

  } catch (error) {
    
    console.error("Error creating user:", error);
    res.status(500).send("Server error: " + error.message);
  
  }
});
    


router.post('/user/login', async (req, res) => {
  
  const { username, password } = req.body;    
  const user = await User.verifyUser(username);
  const passwordIsValid = await Auth.verifyPassword(password, user.password);

  if(passwordIsValid==false || user==null){
    res.status(500).send("error in password or user not registered")
    return;
  }
  
  try{
    const token = await Auth.getToken(user);
    res.status(200).json(token);
  }catch(err){
    console.log("error geting and sending token: "+ err);
    throw err;
  }

});


module.exports = router;