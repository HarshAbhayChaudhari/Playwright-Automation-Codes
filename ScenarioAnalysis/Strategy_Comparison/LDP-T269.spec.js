const {test,expect, request}= require('@playwright/test');
const logindata=JSON.parse(JSON.stringify(require('../../../testdata/Logindata.json'))); //convert json file to string format and then create a object for converted file
const inputdata=JSON.parse(JSON.stringify(require('../../../testdata/ID_ScenarioAnalysis.json')));
let webContext2;
//let webContext3;

test( 'Verify the default labels in X-axis on the Strategy Comparision grid',async({browser})=>
{
    //for acme variable webContext3 and ScenarioAnalysisAcmeLogindata.json
    webContext2 = await browser.newContext({storageState:'LoginBypassCookies.json'});
    const page = await webContext2.newPage(); //for acme webContext3
    await page.goto(logindata.presaleslink); //for acme link1
    const frame = page.frameLocator('#mfe');
    await frame.locator(inputdata.ScenarioAnalysis).click();

    //for acme (inputdata.AcmeX_Axis_DD) in the place of (inputdata.AcmeX_Axis_DD)
    await frame.locator(inputdata.X_Axis_DD).waitFor();
    await frame.locator(inputdata.X_Axis_DD).click();
    
    await page.waitForTimeout(3000);
    var bool = await frame.locator(inputdata.XY_Axis_Stocks).isVisible();
    expect(bool).toBeTruthy();

    //for acme (inputdata.AcmeXY_Axis_CumulatedRevenue) in the place of (inputdata.XY_Axis_CumulativeRevenue)
    var CumulativeRevenue = await frame.locator(inputdata.XY_Axis_CumulativeRevenue).isDisabled();
    expect(CumulativeRevenue).toBeTruthy();

    //for acme (inputdata.AcmeXY_Axis_CumulatedSalesVolume) in the place of (inputdata.XY_Axis_CumulativeSales)
    var boolean = await frame.locator(inputdata.XY_Axis_CumulativeSales).isVisible();
    expect(boolean).toBeTruthy();

    //for acme comment salesforce bcoz it is not present in acme 

    var salesAfterReturn = await frame.locator(inputdata.XY_Axis_SalesAfterReturns).isVisible();
    expect(salesAfterReturn).toBeTruthy();

    //for acme (inputdata.AcmeXY_Axis_CumulatedProfit) in the place of (inputdata.XY_Axis_CumulativeProfit)
    var cumulativeProfit = await frame.locator(inputdata.XY_Axis_CumulativeProfit).isVisible();
    expect(cumulativeProfit).toBeTruthy();

    
})