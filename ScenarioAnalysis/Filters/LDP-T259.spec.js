const {test,expect, request}= require('@playwright/test');
const logindata=JSON.parse(JSON.stringify(require('../../../testdata/Logindata.json'))); //convert json file to string format and then create a object for converted file
const inputdata=JSON.parse(JSON.stringify(require('../../../testdata/ID_ScenarioAnalysis.json')));
let webContext2;
//let webContext3;

test( 'toggle between local currency and reference currency',async({browser})=>
{
    //for acme variable webContext3 and ScenarioAnalysisAcmeLogindata.json
    webContext2 = await browser.newContext({storageState:'LoginBypassCookies.json'});
    const page = await webContext2.newPage(); //for acme webContext3
    await page.goto(logindata.presaleslink); //for acme link1
    const frame = page.frameLocator('#mfe');
    await frame.locator(inputdata.ScenarioAnalysis).click();
    
    await frame.locator(inputdata.ViewPricesAndKPIs).waitFor();
    await expect(frame.locator(inputdata.ViewPricesAndKPIs)).toHaveText('View Prices and KPIs in');
    
    var bool = await frame.locator(inputdata.ToggleReferenceCurrency).isEnabled();
    expect(bool).toBeTruthy();
    await frame.locator(inputdata.ToggleReferenceCurrency).click();
    var boolean = await frame.locator(inputdata.ToggleReferenceCurrency).isEnabled();
    expect(boolean).toBeTruthy();
    await frame.locator(inputdata.ToggleReferenceCurrency).click();
    await page.waitForTimeout(2000);
    //await page.pause();
})