const scraper = require('./src/Scraping/scrape');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/3MonthRates', async(req, res) => {
    try {
        const funds = await scraper.getFundReturnRates();
        res.json(funds);
    } 
    catch(error) {
        console.error(error);
    }
    
})

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));