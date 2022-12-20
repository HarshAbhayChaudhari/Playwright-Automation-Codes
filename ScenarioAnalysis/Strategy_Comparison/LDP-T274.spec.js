const {test,expect, request}= require('@playwright/test');
const logindata=JSON.parse(JSON.stringify(require('../../../testdata/Logindata.json'))); //convert json file to string format and then create a object for converted file
const inputdata=JSON.parse(JSON.stringify(require('../../../testdata/ID_ScenarioAnalysis.json')));
let webContext2;
//let webContext3;

test( 'Verify the default metrics in Strategy Comparision grid',async({browser})=>
{
    //for acme variable webContext3 and ScenarioAnalysisAcmeLogindata.json
    webContext2 = await browser.newContext({storageState:'LoginBypassCookies.json'});
    const page = await webContext2.newPage(); //for acme webContext3
    await page.goto(logindata.presaleslink); //for acme link1
    const frame = page.frameLocator('#mfe');
    await page.waitForTimeout(3000);
    await frame.locator(inputdata.ScenarioAnalysis).click();
    let git = frame.locator(inputdata.SSI);
    const box = await git.boundingBox();
    if(box){
        const y = box.y;
        await page.mouse.wheel(0, y);
    }
    
    //for acme (inputdata.Acme_SCCumulatedProfit) in the place of (inputdata.SCCumulativeProfit)
    var CumulativeProfit = await frame.locator(inputdata.SCCumulativeProfit).isVisible();
    expect(CumulativeProfit).toBeTruthy();
    //for acme (inputdata.Acme_SCCumulatedRevenue) in the place of (inputdata.SCCumulativeRevenue)
    var CumulativeRevenue = await frame.locator(inputdata.SCCumulativeRevenue).isVisible();
    expect(CumulativeRevenue).toBeTruthy();
   
    var Stocks = await frame.locator(inputdata.SCStocks).isVisible();
    expect(Stocks).toBeTruthy();
    //for acme (inputdata.Acme_SCCumulatedSalesVolume) in the place of (inputdata.SCCumulativeSales)
    var CumulativeSales = await frame.locator(inputdata.SCCumulativeSales).isVisible();
    expect(CumulativeSales).toBeTruthy();

    //for acme comment SalesAfterReturn line bcoz it is not present in acme

    var SalesAfterReturn = await frame.locator(inputdata.SCSalesAfterReturn).isVisible();
    expect(SalesAfterReturn).toBeTruthy();
    
    await page.waitForTimeout(3000);
})