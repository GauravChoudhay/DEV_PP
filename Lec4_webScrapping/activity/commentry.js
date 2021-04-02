const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");

let lastBallCommentary = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/ball-by-ball-commentary";
let highestWicketTaker = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/full-scorecard"

request(lastBallCommentary, cb);

function cb(error, response, body) {
  parseBody(body);
}

function parseBody(html) {
  // i will get html here of cricinfo ipl home page !!
  let ch = cheerio.load(html);
  //fs.writeFileSync("htmlKaDta.html",html);
  let divTag = ch('[itemprop="articleBody"]');
  divTagKaData = ch(divTag['0']).text();
  console.log(divTagKaData);
}