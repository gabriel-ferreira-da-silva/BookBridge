const winston =  require('winston');
const path = require('path');
const { combine, timestamp, json } = winston.format;
require('dotenv').config();


const errorFilter = winston.format((info, opts) => {
    return info.level === 'error' ? info : false;
});

const infoFilter = winston.format((info, opts) => {
    return info.level === 'info' ? info : false;
});

const logger = winston.createLogger({
    level: process.env.LOG_LEVEL || 'info',
    format: combine(timestamp(), json()),
    transports: [
        new winston.transports.File({
        filename: path.resolve(__dirname, '../../log/app.log'),    
        level: 'error',
        format: combine(errorFilter(), timestamp(), json()),
        }),

        new winston.transports.File({
        filename: path.resolve(__dirname, '../../log/app.log'),    
        level: 'info',
        format: combine(infoFilter(), timestamp(), json()),
        }),
    ],
});

module.exports = logger;