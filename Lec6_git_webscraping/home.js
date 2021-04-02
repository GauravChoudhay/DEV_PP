const fs = require("fs");
const cheerio = require("cheerio");
const request = require("request");
const topicRepo = require("./topicRepo");


request("https://github.com/topics" , parseBody);

function parseBody(error, response, data){
    let ch = cheerio.load(data);
    let allATags = ch('.topic-box a');
    //console.log(allATags.length);
    for(let i=0;i<allATags.length;i++){
        let topicLink = ch(allATags[`${i}`]).attr("href");
        let completeTopicLink = "https://github.com" + topicLink;
        topicRepo(completeTopicLink);
        
    }
}