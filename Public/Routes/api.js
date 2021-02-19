const scraper = require('../Scraping/scrape');

const express = require('express');
const router = express.Router();

router.get('/getreturnrates', async(req, res) => {
    try {
        const funds = await scraper.getFundReturnRates();
        res.json(funds);
    } 
    catch(error) {
        console.error(error);
    }
})

module.exports = router;