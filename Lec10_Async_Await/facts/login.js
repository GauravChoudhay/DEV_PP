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
    
    await tab.waitForSelector(".ui-icon-chevron-down.down-icon");
    await tab.click('.ui-icon-chevron-down.down-icon');
    //.nav-tabs.nav.admin-tabbed-nav .backbone
    await tab.waitForSelector('a[data-analytics="NavBarProfileDropDownAdministration"]');
    await tab.click('a[data-analytics="NavBarProfileDropDownAdministration"]');
    await tab.waitForSelector(".nav-tabs.nav.admin-tabbed-nav .backbone", {visibile : true} );
    let allbutton = await tab.$$(".nav-tabs.nav.admin-tabbed-nav .backbone")
    //console.log(allLinks);
    let manageChallangebutton = allbutton[1];
    await manageChallangebutton.click();

    
})();