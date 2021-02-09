const scraper = require('../Scraping/scrape');

const express = require('express');
const router = express.Router();

/**
 * GET the 20 funds that have the highest 3-month return
 * Returns: JSON Array
 */
router.get('/3monthreturn', async(req, res) => {
    try {
        const funds = await scraper.getFundReturnRates();
        res.json(funds);
    } 
    catch(error) {
        console.error(error);
    }
})

module.exports = router;