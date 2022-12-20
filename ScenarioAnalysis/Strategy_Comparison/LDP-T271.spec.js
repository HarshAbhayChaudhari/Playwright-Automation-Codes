const {test,expect, request}= require('@playwright/test');
const logindata=JSON.parse(JSON.stringify(require('../../../testdata/Logindata.json'))); //convert json file to string format and then create a object for converted file
const inputdata=JSON.parse(JSON.stringify(require('../../../testdata/ID_ScenarioAnalysis.json')));
let webContext2;
//let webContext3;

test('Verify that user can able to select any label in X-axis dropdown in Strategy Comparision grid',async({browser})=>
{
    //for acme variable webContext3 and ScenarioAnalysisAcmeLogindata.json
    webContext2 = await browser.newContext({storageState:'LoginBypassCookies.json'});
    const page = await webContext2.newPage(); //for acme webContext3
    await page.goto(logindata.presaleslink); //for acme link1
    const frame = page.frameLocator('#mfe');
    await frame.locator(inputdata.ScenarioAnalysis).click();
    await page.waitForTimeout(3000);
    
    //for acme (inputdata.AcmeX_Axis_DD) in the place of (inputdata.X_Axis_DD)
    var bool = await frame.locator(inputdata.X_Axis_DD).isEnabled();
    expect(bool).toBeTruthy();
    await frame.locator(inputdata.X_Axis_DD).click();
    await frame.locator(inputdata.XY_Axis_CumulativeProfit).waitFor();
    //for acme (inputdata.AcmeXY_Axis_CumulatedProfit) in the place of (inputdata.XY_Axis_CumulativeProfit)
    var CumulativeProfit = await frame.locator(inputdata.XY_Axis_CumulativeProfit).isVisible();
    expect(CumulativeProfit).toBeTruthy();
   //for acme (inputdata.AcmeXY_Axis_CumulatedRevenue) in the place of (inputdata.XY_Axis_CumulativeRevenue)
    var CumulativeRevenue = await frame.locator(inputdata.XY_Axis_CumulativeRevenue).isDisabled();
    expect(CumulativeRevenue).toBeTruthy();
  //for acme (inputdata.AcmeXY_Axis_CumulatedSalesVolume) in the place of (inputdata.XY_Axis_CumulativeSales)
    var CumulativeSales = await frame.locator(inputdata.XY_Axis_CumulativeSales).isVisible();
    expect(CumulativeSales).toBeTruthy();
    //for acme comment SalesAfterReturn line bcoz it is not present in acme

    var SalesAfterReturn = await frame.locator(inputdata.XY_Axis_SalesAfterReturns).isVisible();
    expect(SalesAfterReturn).toBeTruthy();
    
    var boolean = await frame.locator(inputdata.XY_Axis_Stocks).isVisible();
    expect(boolean).toBeTruthy();
    await frame.locator(inputdata.XY_Axis_Stocks).click(); //select stocks

    await frame.locator("div[role='button']:has-text('Stocks (PCS)')").waitFor();
    var Stocks = await frame.locator("div[role='button']:has-text('Stocks (PCS)')").isVisible(); //after selecting in dropdown
    expect(Stocks).toBeTruthy();
    let git = frame.locator("text:has-text('Stocks (PCS)')");
    const box = await git.boundingBox();
    if(box){
        const y = box.y;
        await page.mouse.wheel(0, y);
    }
    var bool = await frame.locator("text:has-text('Stocks (PCS)')").isVisible(); //after selecting in graph
    expect(bool).toBeTruthy();
    await page.waitForTimeout(3000);
})