const {test,expect, request}= require('@playwright/test');
const logindata=JSON.parse(JSON.stringify(require('../../../testdata/Logindata.json'))); //convert json file to string format and then create a object for converted file
const inputdata=JSON.parse(JSON.stringify(require('../../../testdata/ID_ScenarioAnalysis.json')));
let webContext2;
//let webContext3;

test('Verify that the each selection made by the user in the X-axis and in Y-axis are properly varying',async({browser})=>
{
    //for acme variable webContext3 and ScenarioAnalysisAcmeLogindata.json
    webContext2 = await browser.newContext({storageState:'LoginBypassCookies.json'});
    const page = await webContext2.newPage(); //for acme webContext3
    await page.goto(logindata.presaleslink); //for acme link1
    const frame = page.frameLocator('#mfe');
    await page.waitForTimeout(3000);
    await frame.locator(inputdata.ScenarioAnalysis).click();
    await page.waitForTimeout(3000);
    //for acme (inputdata.AcmeX_Axis_DD) in the place of (inputdata.X_Axis_DD)
    var bool = await frame.locator(inputdata.X_Axis_DD).isVisible();
    expect(bool).toBeTruthy();
    await frame.locator(inputdata.X_Axis_DD).click(); //click on x-axix
    await frame.locator(inputdata.XY_Axis_Stocks).waitFor();
    var Stocks = await frame.locator(inputdata.XY_Axis_Stocks).isEnabled();
    expect(Stocks).toBeTruthy();
    await frame.locator(inputdata.XY_Axis_Stocks).click(); //select stocks 
    await frame.locator("div[role='button']:has-text('Stocks (PCS)')").waitFor();
    var Stocks = await frame.locator("div[role='button']:has-text('Stocks (PCS)')").isVisible(); //after selecting in X-axis dropdown 
    expect(Stocks).toBeTruthy();
    let git = frame.locator("text:has-text('Stocks (PCS)')");
    const box = await git.boundingBox();
    if(box){
        const y = box.y;
        await page.mouse.wheel(0, y);
    }
    var bool = await frame.locator("text:has-text('Stocks (PCS)')").isVisible(); //after selecting in graph
    expect(bool).toBeTruthy();
    await page.waitForTimeout(2000);

    //for acme (inputdata.AcmeY_Axis_DD)
    var boolean = await frame.locator(inputdata.Y_Axis_DD).isVisible();
    expect(boolean).toBeTruthy();
    await frame.locator(inputdata.Y_Axis_DD).click(); //click on y-axis
    await page.waitForTimeout(2000);
    //for acme (inputdata.AcmeXY_Axis_CumulatedeSalesVolume) in the place of (inputdata.XY_Axis_CumulativeSales)
    var CumulativeSales = await frame.locator(inputdata.XY_Axis_CumulativeSales).isEnabled();
    expect(CumulativeSales).toBeTruthy();
    await frame.locator(inputdata.XY_Axis_CumulativeSales).click(); //select cumulative stocks
    
    //for acme ('Cumulated Sales Volume (PCS)') in the place of ('Cumulative Sales (PCS)')
    await frame.locator("div[role='button']:has-text('Cumulative Sales (PCS)')").waitFor();
    var bool = await frame.locator("div[role='button']:has-text('Cumulative Sales (PCS)')").isVisible(); //after selecting in x-axis dropdown 
    expect(bool).toBeTruthy();
    
    var bool = await frame.locator("text:has-text('Cumulative Sales (PCS)')").isVisible(); //after selecting in graph
    expect(bool).toBeTruthy();
    await page.waitForTimeout(3000);
    
})