const mysql = require('mysql2');
const logger = require('../logger/logger');

require('dotenv').config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    logger.error('database could not connect')
    return;
  }
  logger.info('database connected')
});

module.exports = db;