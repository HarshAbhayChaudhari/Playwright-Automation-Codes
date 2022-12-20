const {test,expect, request}= require('@playwright/test');
const logindata=JSON.parse(JSON.stringify(require('../../../testdata/Logindata.json'))); //convert json file to string format and then create a object for converted file
const inputdata=JSON.parse(JSON.stringify(require('../../../testdata/ID_ScenarioAnalysis.json')));
let webContext2;
//let webContext3;

test( 'clear selection action in product section',async({browser})=>
{
    //for acme variable webContext3 and ScenarioAnalysisAcmeLogindata.json
    webContext2 = await browser.newContext({storageState:'LoginBypassCookies.json'});
    const page = await webContext2.newPage(); //for acme webcontext3
    await page.goto(logindata.presaleslink); //for acme link1
    const frame = page.frameLocator('#mfe');
    await frame.locator(inputdata.ScenarioAnalysis).click();
    await page.waitForTimeout(3000);
    let git =  frame.locator(inputdata.AdditionalFilters);
    const box = await git.boundingBox();
    if(box){
        const y = box.y;
        await page.mouse.wheel(0,y);
    }
    var bool = await frame.locator(inputdata.ProductSearchBarField).isVisible();
    expect(bool).toBeTruthy();
    await frame.locator(inputdata.ProductSearchBarField).click();
    await frame.locator(inputdata.ProductsOption_1).waitFor();
    var boolean = await frame.locator(inputdata.ProductsOption_1).isEnabled();
    expect(boolean).toBeTruthy();
    await frame.locator(inputdata.ProductsOption_1).click();
    await page.waitForTimeout(2000);
    var ClearSelection = await frame.locator(inputdata.ClearSelection).isEnabled();
    expect(ClearSelection).toBeTruthy();
    await frame.locator(inputdata.ClearSelection).click();
    var boolean = await frame.locator(inputdata.ProductsOption_1).isEnabled(); //after clearSelection option1 get enabled
    expect(boolean).toBeTruthy();
    var Done = await frame.locator(inputdata.Done).isEnabled();
    expect(Done).toBeTruthy();
    await frame.locator(inputdata.Done).click();

    await page.waitForTimeout(3000);
})