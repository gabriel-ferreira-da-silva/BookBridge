const express = require('express');
const mysql = require('mysql2');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyToken = (token)=>{
    return new Promise((resolve,reject)=>{
        jwt.verify(token, process.env.JWT_SECRET_KEY , async (err,authorizedData)=>{
            
            if (err) return reject(err);
            resolve(!!authorizedData);
        
        });
    });
};


const hashPassword = (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, 10, (hashErr, hashedPassword) => {
        
            if (hashErr) return reject(hashErr);

            resolve(hashedPassword);
        
        });
    });
};


const verifyPassword = (password,userPassword) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, userPassword, (err, isMatch) => {
        
            if (err)  return reject(err);
            resolve(isMatch);
         
        });
    });
};


const getToken = (user) => {
    return new Promise((resolve, reject) => {
        jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' }, (err, token) => {
            
            if (err) return reject(err);
            resolve(token);
        
        }); 
    });
};



module.exports = { verifyToken,getToken, hashPassword, verifyPassword};