const {test,expect, request}= require('@playwright/test');
const logindata=JSON.parse(JSON.stringify(require('../../../testdata/Logindata.json'))); //convert json file to string format and then create a object for converted file
const inputdata=JSON.parse(JSON.stringify(require('../../../testdata/ID_ScenarioAnalysis.json')));
let webContext2;
//let webContext3;

test( 'Verify the default fields in Strategy Comparision grid on the Scenario Analysis Page',async({browser})=>
{
    //for acme variable webContext3 and ScenarioAnalysisAcmeLogindata.json
    webContext2 = await browser.newContext({storageState:'LoginBypassCookies.json'});
    const page = await webContext2.newPage(); //for acme webContext3
    await page.goto(logindata.presaleslink); //for acme link1
    const frame = page.frameLocator('#mfe');
    await frame.locator(inputdata.ScenarioAnalysis).click();
    await page.waitForTimeout(3000);
    var bool = await frame.locator(inputdata.SC).isVisible();
    expect(bool).toBeTruthy();
    
    await frame.locator(inputdata.X_Axis).waitFor();
    var boolean = await frame.locator(inputdata.X_Axis).isVisible();
    expect(boolean).toBeTruthy();
    
    var yaxis = await frame.locator(inputdata.Y_Axis).isVisible();
    expect(yaxis).toBeTruthy();
    let git = frame.locator(inputdata.SSI);
    const box = await git.boundingBox();
    if(box){
        const y = box.y;
        await page.mouse.wheel(0, y);
    }
    await frame.locator(inputdata.SC_CurrentStrategy).waitFor();
    var bool = await frame.locator(inputdata.SC_CurrentStrategy).isVisible();
    expect(boolean).toBeTruthy();
    var bool = await frame.locator(inputdata.SC_ConstantStrategy).isVisible();
    expect(boolean).toBeTruthy();
    var bool = await frame.locator(inputdata.SC_MainStrategy).isVisible();
    expect(boolean).toBeTruthy();
    var bool = await frame.locator(inputdata.SC_ProfitStrategy).isVisible();
    expect(boolean).toBeTruthy();
    var bool = await frame.locator(inputdata.SC_SellThruStrategy).isVisible();
    expect(boolean).toBeTruthy();
    await frame.locator(inputdata.SCCumulativeProfit).waitFor();
    var bool = await frame.locator(inputdata.SCCumulativeProfit).isVisible();
    expect(boolean).toBeTruthy();
    var bool = await frame.locator(inputdata.SCCumulativeRevenue).isVisible();
    expect(boolean).toBeTruthy();
    var bool = await frame.locator(inputdata.SCStocks).isVisible();
    expect(boolean).toBeTruthy();
    var bool = await frame.locator(inputdata.SCCumulativeSales).isVisible();
    expect(boolean).toBeTruthy();
    var bool = await frame.locator(inputdata.SCSalesAfterReturn).isVisible();
    expect(boolean).toBeTruthy();
    
    
});