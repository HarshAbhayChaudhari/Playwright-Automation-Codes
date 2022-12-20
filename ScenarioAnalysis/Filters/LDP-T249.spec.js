const {test,expect, request}= require('@playwright/test');
const logindata=JSON.parse(JSON.stringify(require('../../../testdata/Logindata.json'))); //convert json file to string format and then create a object for converted file
const inputdata=JSON.parse(JSON.stringify(require('../../../testdata/ID_ScenarioAnalysis.json')));
let webContext2;
//let webContext3;

test( 'enter invalid input in Product section search bar',async({browser})=>
{
    //for acme variable webContext3 and ScenarioAnalysisAcmeLogindata.json
    webContext2 = await browser.newContext({storageState:'LoginBypassCookies.json'});
    const page = await webContext2.newPage(); //for acme webContext3
    await page.goto(logindata.presaleslink); //for acme link1
    const frame = page.frameLocator('#mfe');
    await frame.locator(inputdata.ScenarioAnalysis).click();
    await page.waitForTimeout(3000);
    var bool = await frame.locator(inputdata.ProductSearchBarField).isVisible();
    expect(bool).toBeTruthy();
    await frame.locator(inputdata.ProductSearchBarField).click();
    await frame.locator(inputdata.ProductHierarchySearchField).waitFor();
    await frame.locator(inputdata.ProductHierarchySearchField).type('vgvgvg',{delay:100});
    
    await frame.locator("div:has-text('Sorry. We were unable to find a match. Please try modifying your search.') >> nth=3").waitFor();
    var boolean = await frame.locator("div:has-text('Sorry. We were unable to find a match. Please try modifying your search.') >> nth=3").isVisible();
    expect(boolean).toBeTruthy();
    
    
})