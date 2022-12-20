const {test,expect, request}= require('@playwright/test');
const logindata=JSON.parse(JSON.stringify(require('../../../testdata/Logindata.json'))); //convert json file to string format and then create a object for converted file
const inputdata=JSON.parse(JSON.stringify(require('../../../testdata/ID_ScenarioAnalysis.json')));
let webContext2;
//let webContext3;

test('Verify that when user hover to the each startegy in the graph the tooltip should be visible to the user',async({browser})=>
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
    await expect(frame.locator(inputdata.SC)).toHaveText("Strategy Comparison"); 
    var bool = await frame.locator("g:nth-child(10) > .highcharts-point").isVisible();
    expect(bool).toBeTruthy();
    await frame.locator("g:nth-child(10) > .highcharts-point").click();
    await page.pause();
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