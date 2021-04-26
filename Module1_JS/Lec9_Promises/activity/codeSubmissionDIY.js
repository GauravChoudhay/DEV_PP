const puppeteer = require("puppeteer");
let tab;
let id = "gojet35863@astarmax.com";
let pw = "9999999999";


let openBrowserPromise = puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: ["--start-maximized"]
});

openBrowserPromise
    .then(function (browser) {
        let allPagesPromise = browser.pages();
        return allPagesPromise;
    })
    .then(function (pages) {
        tab = pages[0];
        let openHrPromises = tab.goto("https://www.hackerrank.com/auth/login");
        return openHrPromises;
    })
    .then(function(){
        let enterLoginDetailsPromise = tab.type("#input-1" , id);
        return enterLoginDetailsPromise;
    })
    .then(function(){
        let enterPasswordPromise = tab.type("#input-2" , pw);
        return enterPasswordPromise ;
    })
    .then(function(){
        let clickLoginPromies = tab.click(".ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled");
        return clickLoginPromies;
    })

    .catch(function (error) {
        console.log(error);
    })