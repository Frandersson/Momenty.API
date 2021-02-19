// node_modules
const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

// Models
const GenericFundObject = require('./Models/genericFund');


async function getFundReturnRates() {
    let fundNames = [];
    let oneWeekReturnRates = [];
    let oneMonthReturnRates = [];
    let threeMonthReturnRates = [];
    let oneYearReturnRates = [];

    let finalFundArray = [];

    const htmlResponse = await axios.get(process.env.RR_URL);
    //var htmlResponse = fs.readFileSync('./output/funds', 'utf-8');

    const $ = cheerio.load(htmlResponse.data);

    $('table').each((index, tableElement) => {

        $(tableElement).find('a').each((index, fundLink) => {
            fundNames.push($(fundLink).text().trim());
        })

        $(tableElement).find('tbody > tr').each((index, rowElement) => {
            $(rowElement).find('td').each((index, rate) => {

                if(index == 1) return;

                parsedRate = parseFloat($(rate).text().trim().replace(",", "."));

                switch(index) {
                    case 2:
                        oneWeekReturnRates.push(parsedRate);
                        break;
                    case 3:
                        oneMonthReturnRates.push(parsedRate);
                        break;
                    case 4:
                        threeMonthReturnRates.push(parsedRate);
                        break;
                    case 6:
                        oneYearReturnRates.push(parsedRate);
                        break;
                    default:
                        break;
                }
            })
        })
    })

    fundNames.forEach(function(value, index) {
        finalFundArray.push(new GenericFundObject(
            value,
            oneWeekReturnRates[index],
            oneMonthReturnRates[index],
            threeMonthReturnRates[index],
            oneYearReturnRates[index]
        ));
    })

    return finalFundArray;
}

exports.getFundReturnRates = getFundReturnRates;