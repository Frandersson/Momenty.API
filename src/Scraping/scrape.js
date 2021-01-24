const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

//const requestUrl = "https://www.di.se/fonder/historik/?SortBy=Diff3mPrc&SortOrder=desc"


async function getFundReturnRates() {
    fs.readFile('./output/funds', 'utf-8', (err, data) => {
        if (err) {
            throw err;
        }

        const $ = cheerio.load(data);
        $('table.fixed-table').addClass('123!!!');
        
        console.log($.html());
    })
}

exports.getFundReturnRates = getFundReturnRates;