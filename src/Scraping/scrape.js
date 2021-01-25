const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

/*
const requestUrl = "https://www.di.se/fonder/historik/?SortBy=Diff3mPrc&SortOrder=desc"

async function loadFile() {
    axios.get(requestUrl).then(function(response) {

        const data = response.data;

        fs.writeFile('./output/funds', data, function(err) {
            if (err) throw err;
        })
    })
}
*/

async function getFundReturnRates() {
    fs.readFile('./output/funds', 'utf-8', (error, data) => {
        if (error) throw error;
        
        let fundNames = [];
        let fundReturnRates = [];
        let fundMap = {};
        const $ = cheerio.load(data);
        
        $('table.fixed-table tbody').first().find('a').each(function() {
            fundNames.push($(this).text().trim());
        })

        $('table.scrolling-table tbody').first().find('tr').each(function() {
            $(this).find('td').each(function(i, v) {
                if (i == 3) {
                    fundReturnRates.push($(this).text().trim())
                }
            })
        })

        fundNames.forEach(function(value, index) {
            fundMap[value] = parseFloat(fundReturnRates[index].replace(",", "."));
        })

        console.log(JSON.stringify(fundMap));
    })
}

exports.getFundReturnRates = getFundReturnRates;
//exports.loadFile = loadFile;