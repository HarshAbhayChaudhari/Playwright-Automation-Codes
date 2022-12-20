const {test,expect, request}= require('@playwright/test');
const logindata=JSON.parse(JSON.stringify(require('../../../testdata/Logindata.json'))); //convert json file to string format and then create a object for converted file
const inputdata=JSON.parse(JSON.stringify(require('../../../testdata/ID_ScenarioAnalysis.json')));
let webContext2;
//let webContext3;

test( 'Verify that in Strategy Comparision grid the following Y-axis labels are available to the user for selection in the graphs',async({browser})=>
{
    //for acme variable webContext3 and ScenarioAnalysisAcmeLogindata.json
    webContext2 = await browser.newContext({storageState:'LoginBypassCookies.json'});
    const page = await webContext2.newPage(); //for acme webContext3
    await page.goto(logindata.presaleslink); //for acme link1
    const frame = page.frameLocator('#mfe');
    await page.waitForTimeout(3000);
    await page.frameLocator('#mfe').locator(inputdata.ScenarioAnalysis).click();
    await page.waitForTimeout(3000);
    //for acme (inputdata.AcmeY_Axis_DD) in the place of (inputdata.Y_Axis_DD)
    var bool = await frame.locator(inputdata.Y_Axis_DD).isVisible();
    expect(bool).toBeTruthy();
    await frame.locator(inputdata.Y_Axis_DD).click();
    await page.waitForTimeout(3000);
    //for acme (inputdata.AcmeXY_Axis_CumulatedRevenue) in the place of (inputdata.XY_Axis_CumulativeRevenue)
    var CumulativeRevenue = await frame.locator(inputdata.XY_Axis_CumulativeRevenue).isVisible();
    expect(CumulativeRevenue).toBeTruthy();
   //for acme (inputdata.AcmeXY_Axis_CumulatedProfit) in the place of (inputdata.XY_Axis_CumulativeProfit)
    var CumulativeProfit = await frame.locator(inputdata.XY_Axis_CumulativeProfit).isDisabled();
    expect(CumulativeProfit).toBeTruthy();

    var Stocks = await frame.locator(inputdata.XY_Axis_Stocks).isVisible();
    expect(Stocks).toBeTruthy();
    
    //for acme (inputdata.AcmeXY_Axis_CumulatedeSalesVolume) in the place of (inputdata.XY_Axis_CumulativeSales)
    var CumulativeSales = await frame.locator(inputdata.XY_Axis_CumulativeSales).isVisible();
    expect(CumulativeSales).toBeTruthy();
   
    //for acme comment SalesAfterReturn line bcoz it is not present in acme

    var SalesAfterReturn = await frame.locator(inputdata.XY_Axis_SalesAfterReturns).isVisible();
    expect(SalesAfterReturn).toBeTruthy();
    
    await page.waitForTimeout(3000);
    //await page.pause();
})