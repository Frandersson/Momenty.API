const scraper = require('./src/Scraping/scrape');
const express = require('express');

const app = express();
const PORT = 3000;

app.get('/3MonthRates', function(req, res) {
    try {
        const rates = scraper.getFundReturnRates();
        res.send(rates);
    } catch(e) {
        console.log(e);
    }
})

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));