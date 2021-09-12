const request = require('request');
const fs = require('fs');
const cheerio = require('cheerio');

function issue(link, path){
    request(link , parseData);

    function parseData(error, require, data){
        let ch = cheerio.load(data);
        let allATags = ch('a[data-hovercard-type="issue"]');
        for(let i =0; i<5; i++){
            let issueName = ch(allATags[i]).text().trim();
            let issueLink = "https://github.com" + ch(allATags[i]).attr('href');
            //console.log("name : " + issueName + " link: " + issueLink);
            
            if(!fs.existsSync(`${path}/{issue.json}`)){
                fs.writeFileSync(`${path}/{issue.json}`, JSON.stringify([]));
            }
            let issueJsonKaData = JSON.parse(fs.readFileSync(`${path}/{issue.json}`));
            let newIssue = {
                "Issue Name :": issueName,
                "Issue link :": issueLink
            }
            issueJsonKaData.push(newIssue);
            fs.writeFileSync(`${path}/{issue.json}`, JSON.stringify(issueJsonKaData));



        }

    }
}



module.exports = issue; 
