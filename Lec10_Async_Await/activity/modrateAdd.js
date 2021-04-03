const puppeteer = require("puppeteer");
const id = "gojet35863@astarmax.com";
const pw = "9999999999";

(async function(){
    let browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        args: ["--start-maximized"],
      }); // 10 sec
    let allPages = await browser.pages();
    let tab = allPages[0];
    await tab.goto("https://www.hackerrank.com/auth/login");
    await tab.type("#input-1", id);
    await tab.type("#input-2", pw);
    await tab.click(".ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled");
    await tab.waitForSelector('div[data-analytics="NavBarProfileDropDown"]' , {visible:true});
    await tab.click('div[data-analytics="NavBarProfileDropDown"]');
    await tab.waitForSelector('a[data-analytics="NavBarProfileDropDownAdministration"]' , {visible:true});
    await tab.click('a[data-analytics="NavBarProfileDropDownAdministration"]');
    // delay
    await tab.waitForTimeout(5000);
    await tab.waitForSelector('.nav-tabs.nav.admin-tabbed-nav a' , {visible:true});
    let bothATags = await tab.$$('.nav-tabs.nav.admin-tabbed-nav a');
    let manageChallengeATag = bothATags[1];
    await manageChallengeATag.click();
    //await tab.setDefaultTimeout(5000);
    await tab.waitForSelector(".backbone.block-center");
    let allQues = await tab.$$(".backbone.block-center");

    for(let i=0;i<allQues.length;i++){
        let ques = allQues[i];
        //allChallangesLinks.push 
        let currentQuesLink = await tab.evaluate(function(elem){
            return elem.getAttribute("href");
        } , ques)
        let completeCurrentQuesLink = 'https://www.hackerrank.com'+currentQuesLink;
        console.log(completeCurrentQuesLink );
        //await addModrators(browsre , completeCurrentQuesLink);
    }
    
})();

async addModrators(browser , completeCurrentQuesLink){
    
}