const express = require('express');
const router = express.Router();
require('dotenv').config();

const logger = require('../modules/logger/logger')
const Auth = require('../utils/authUtils');
const Stats = require('../utils/statsUtils');

router.get('/stat/numberOfBooks', async (req, res) => {
    try {

        const results = await Stats.getNumberOfBooks() ; 
        res.json(results);
        logger.info({req,"message":"successfull" })

    } catch (error) {

        res.status(500).send('Server error: ' + error.message);
        logger.error({req, error });

    }
});



router.get('/stat/avgratings', async (req, res) => {
    try {

        const results = await Stats.getAverageOfRatings() ; 
        res.json(results);
        logger.info({req,"message":"successfull" })

    } catch (error) {

        res.status(500).send('Server error: ' + error.message);
        logger.error({req, error });

    }
});




router.get('/stat/avgbybook', async (req, res) => {
    try {

        const results = await Stats.getAverageByBook() ; 
        res.json(results);
        logger.info({req,"message":"successfull" })

    } catch (error) {

        res.status(500).send('Server error: ' + error.message);
        logger.error({req, error });

    }
});


module.exports = router;