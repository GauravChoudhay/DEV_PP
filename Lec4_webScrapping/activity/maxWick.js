const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const { table } = require('console');

let maxWickTaker ={};

let url = "https://www.espncricinfo.com/series/south-africa-women-tour-of-india-2020-21-1253264/india-women-vs-south-africa-women-4th-odi-1253270/full-scorecard";

request(url, cb);

function cb(error, response, data) {
    parseData(data);
}

function parseData(html) {
    let highestWicketSoFar = 0;
    let bowlerName;
    let economy;
    let ch = cheerio.load(html);

    let bothBowlingTable = ch('.table.bowler');
    //console.log(bothBowlingTable);

    //fs.writeFileSync('./bothbowlingtable.html',bothBowlingTable +"");
    for (let i = 0; i < bothBowlingTable.length; i++) {

        let tableData = ch(bothBowlingTable[`${i}`]);
        let allTrs = ch(tableData).find('tbody tr');

        for (let j = 0; j < allTrs.length; j++) {

            let allTds = ch(allTrs[j]).find('td');
            let wicketTaken = ch(allTds['4']).text();
            if (wicketTaken > highestWicketSoFar) {
                highestWicketSoFar = wicketTaken;
                economy = ch(allTds['5']).text();
                
                bowlerName = ch(allTds['0']).text();
            }


        }
    }

    maxWickTaker.name = bowlerName;
    maxWickTaker.economy = economy;
    maxWickTaker.wicketTaken = highestWicketSoFar;
    console.log(maxWickTaker);


}