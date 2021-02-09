// node_modules
const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

// Models
const GenericFund = require('./Models/genericFund');

/**
 * Scrapes and returns 20 funds with the highest return for the past three months.
 */
async function getFundReturnRates() {
    const htmlData = await axios.get(process.env.THREE_MONTH_RR_URL);

    let fundNames = [];
    let fundReturnRates = [];
    let fundMap = [];
    
    const $ = cheerio.load(htmlData.data);
    
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
        let returnRate = parseFloat(fundReturnRates[index].replace(",", "."));
        fundMap.push(new GenericFund(value, returnRate));
    })

    return fundMap;
}

exports.getFundReturnRates = getFundReturnRates;