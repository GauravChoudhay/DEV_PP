const request = require('request');
const fs = require('fs');
const cheerio = require('cheerio');
const issue = require('./issue.js');

function allTopics(link){
    request(link , parseData)
}

function parseData(error, response, data){
    let ch = cheerio.load(data);
    let topicName = ch('.h1-mktg').text().trim();
    let allRepo = ch('.border.rounded.color-shadow-small.color-bg-secondary.my-4');
    console.log("```````````1        ``````````````")
    for(let i=0; i<5; i++){
        let repoName = ch(allRepo[i]).find('a.text-bold').text().trim();
        let repoNav = ch(allRepo[i]).find('.tabnav-tabs a');

        let repoIssuesLink = "https://github.com" + ch(repoNav['1']).attr("href");
        if(!fs.existsSync(`./${topicName}`)){
            fs.mkdirSync(`./${topicName}`)
        }
        let path = `./${topicName}/${repoName}`;
        if(!fs.existsSync(path)){
            fs.mkdirSync(path)
        }
        issue(repoIssuesLink , path )
    }
}

module.exports = allTopics;