const {test,expect, request}= require('@playwright/test');
const logindata=JSON.parse(JSON.stringify(require('../../../testdata/Logindata.json'))); //convert json file to string format and then create a object for converted file
const inputdata=JSON.parse(JSON.stringify(require('../../../testdata/ID_ScenarioAnalysis.json')));
let webContext2;
//let webContext3;

test( 'close icon action in product section',async({browser})=>
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
    //for acme write in place of 'Garden & Outdoors' as 'Online'
    await frame.locator(inputdata.ProductHierarchySearchField).type('Garden & Outdoors',{delay:100});
    
    var boolean = await frame.locator(inputdata.HierarchyCloseIcon).isEnabled();
    expect(boolean).toBeTruthy();
    await frame.locator(inputdata.HierarchyCloseIcon).click();
   
    var bool = await frame.locator("input[value=''] >> nth=3").isVisible();
    expect(bool).toBeTruthy();
    await page.waitForTimeout(3000);
})