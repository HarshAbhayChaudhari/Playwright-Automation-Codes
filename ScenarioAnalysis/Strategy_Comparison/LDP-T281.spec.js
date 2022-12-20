const {test,expect, request}= require('@playwright/test');
const logindata=JSON.parse(JSON.stringify(require('../../../testdata/Logindata.json'))); //convert json file to string format and then create a object for converted file
const inputdata=JSON.parse(JSON.stringify(require('../../../testdata/ID_ScenarioAnalysis.json')));
let webContext2;
//let webContext3;

test('Verify that in Strategy Comparision grid in the graph the different plottings should be visible with proper color coding',async({browser})=>
{
    //for acme variable webContext3 and ScenarioAnalysisAcmeLogindata.json
    webContext2 = await browser.newContext({storageState:'LoginBypassCookies.json'});
    const page = await webContext2.newPage(); //for acme webContext3
    await page.goto(logindata.presaleslink); //for acme link1
    const frame = page.frameLocator('#mfe');
    await page.frameLocator('#mfe').locator(inputdata.ScenarioAnalysis).click();
    let git = page.frameLocator('#mfe').locator(inputdata.SSI);
    const box = await git.boundingBox();
    if(box){
        const y = box.y;
        await page.mouse.wheel(0, y);
    }
    await git.textContent();
    await page.waitForTimeout(3000);
    var Current = await frame.locator(inputdata.SC_CurrentStrategyBottom).isVisible();
    expect(Current).toBeTruthy();
   
    var Constant = await frame.locator(inputdata.SC_ConstantStrategyBottom).isVisible();
    expect(Constant).toBeTruthy();
    //for the (inputdata.AcmeSC_BalancedStrategyBottom) in the place (inputdata.SC_MainStrategyBottom)
    var Main = await frame.locator(inputdata.SC_MainStrategyBottom).isVisible();
    expect(Main).toBeTruthy();
    //for acme (inputdata.AcmeSC_MaxProfitStrategyBottom) in the place of (inputdata.SC_ProfitStrategyBottom)
    var Profit = await frame.locator(inputdata.SC_ProfitStrategyBottom).isVisible();
    expect(Profit).toBeTruthy();
    //for acme (inputdata.AcmeSC_MaxRevenueStrategyBottom) in the place of (inputdata.SC_SellThruStrategyBottom)
    var Sell = await frame.locator(inputdata.SC_SellThruStrategyBottom).isVisible();
    expect(Sell).toBeTruthy();
    await page.waitForTimeout(3000);
    var bool = await frame.locator("g:nth-child(10) > .highcharts-point").isVisible();
    expect(bool).toBeTruthy();
    await frame.locator("g:nth-child(10) > .highcharts-point").click();
    await page.waitForTimeout(1000);
    var bool = await frame.locator("g:nth-child(6) > .highcharts-point").isVisible();
    expect(bool).toBeTruthy();
    await frame.locator("g:nth-child(6) > .highcharts-point").click();
    await page.waitForTimeout(1000);
    var bool = await frame.locator("g:nth-child(8) > .highcharts-point").isVisible();
    expect(bool).toBeTruthy();
    await frame.locator("g:nth-child(8) > .highcharts-point").click();
    await page.waitForTimeout(1000);
    await frame.locator("g:nth-child(4) > .highcharts-point >> nth=0").waitFor();
    var bool = await frame.locator("g:nth-child(4) > .highcharts-point >> nth=0").isVisible();
    expect(bool).toBeTruthy();
    await frame.locator("g:nth-child(4) > .highcharts-point >> nth=0").click();
    await page.waitForTimeout(1000);
    
})