const {test,expect, request}= require('@playwright/test');
const logindata=JSON.parse(JSON.stringify(require('../../../testdata/Logindata.json'))); //convert json file to string format and then create a object for converted file
const inputdata=JSON.parse(JSON.stringify(require('../../../testdata/ID_ScenarioAnalysis.json')));
let webContext2;
//let webContext3;
test('Verify the default buttons when user click on any strategy in Strategy Comparision grid',async({browser})=>
{
    //for acme variable webContext3 and ScenarioAnalysisAcmeLogindata.json
    webContext2 = await browser.newContext({storageState:'LoginBypassCookies.json'});
    const page = await webContext2.newPage(); //for acme webContext3
    await page.goto(logindata.presaleslink); //for acme link1
    const frame = page.frameLocator('#mfe');
    await frame.locator(inputdata.ScenarioAnalysis).click();
    
    let git = page.frameLocator('#mfe').locator(inputdata.SSI);
    const box = await git.boundingBox();
    if(box){
        const y = box.y;
        await page.mouse.wheel(0, y);
    }
    
    await frame.locator(inputdata.SC_CurrentStrategyBottom).waitFor();
    var Current = await frame.locator(inputdata.SC_CurrentStrategyBottom).isVisible();
    expect(Current).toBeTruthy();
    
    var Constant = await frame.locator(inputdata.SC_StrategyRadio_1).isEnabled();
    expect(Constant).toBeTruthy();
    
    var bool = await frame.locator(inputdata.SC_StrategyRadio_2).isEnabled();
    expect(bool).toBeTruthy();
    await frame.locator(inputdata.SC_StrategyRadio_2).click();

    var Profit = await frame.locator(inputdata.SC_StrategyRadio_3).isEnabled();
    expect(Profit).toBeTruthy();
   
    var Sell = await frame.locator(inputdata.SC_StrategyRadio_4).isEnabled();
    expect(Sell).toBeTruthy();
    await page.waitForTimeout(3000);
    let gitt = page.frameLocator('#mfe').locator("td[role='cell'] >> text=All >> nth=0");
    const boxx = await gitt.boundingBox();
    if(boxx){
        const y = boxx.y;
        await page.mouse.wheel(0, y);
    }
    var bool = await frame.locator("text=Product Hierarchy").isVisible();
    expect(bool).toBeTruthy();
    
    var bool = await frame.locator("text=Location Hierarchy").isVisible();
    expect(bool).toBeTruthy();
    var bool = await frame.locator("td[role='cell'] >> text=All >> nth=0").isVisible();
    expect(bool).toBeTruthy();
    await page.waitForTimeout(2000);
    //await page.pause();

})