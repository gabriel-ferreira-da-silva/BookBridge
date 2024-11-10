const express = require('express');
const router = express.Router();
require('dotenv').config();

const logger = require('../modules/logger/logger')
const Auth = require('../utils/authUtils');

module.exports = router;