const {test,expect, request}= require('@playwright/test');
const logindata=JSON.parse(JSON.stringify(require('../../../testdata/Logindata.json'))); //convert json file to string format and then create a object for converted file
const inputdata=JSON.parse(JSON.stringify(require('../../../testdata/ID_ScenarioAnalysis.json')));
let webContext2;
//let webContext3;
test( ' Max-Min functionality in Filters grid',async({browser})=>
{
    //for acme variable webContext3 and ScenarioAnalysisAcmeLogindata.json
    webContext2 = await browser.newContext({storageState:'LoginBypassCookies.json'});
    const page = await webContext2.newPage(); //for acme webcontext3
    await page.goto(logindata.presaleslink); //for acme link1
    const frame = page.frameLocator('#mfe');
    await frame.locator(inputdata.ScenarioAnalysis).click();
    await page.waitForTimeout(3000);
    var bool = await frame.locator(inputdata.ScreenMax).isEnabled();
    expect(bool).toBeTruthy();
    await frame.locator(inputdata.ScreenMax).click();
    await page.waitForTimeout(2000);
    var bool = await frame.locator(inputdata.SC).isVisible();
    expect(bool).toBeTruthy();
    await expect(frame.locator(inputdata.SC)).toHaveText("Strategy Comparison");
    let git = frame.locator(inputdata.SSI);
    const box = await git.boundingBox();
    if(box){
        const y = box.y;
        await page.mouse.wheel(0, y);
    }
    var Boolean = await frame.locator(inputdata.SSI).isVisible();
    expect(Boolean).toBeTruthy();
    await expect(frame.locator(inputdata.SSI)).toHaveText("Selected Strategy's Impact On Upper And Lower Levels");
    await page.waitForTimeout(3000);
    
    var boolean = await frame.locator(inputdata.ScreenMin).isEnabled();
    expect(boolean).toBeTruthy();
    await frame.locator(inputdata.ScreenMin).click();
    
    var bool = await frame.locator(inputdata.SC).isVisible();
    expect(bool).toBeTruthy();
    await expect(frame.locator(inputdata.SC)).toHaveText("Strategy Comparison");
    await page.waitForTimeout(2000);
    var boolean = await frame.locator(inputdata.Filters).isVisible();
    expect(boolean).toBeTruthy();
    await expect(frame.locator(inputdata.Filters)).toHaveText("Filters");

    let gitt = frame.locator(inputdata.SSI);
    const boxx = await gitt.boundingBox();
    if(boxx){
        const y = boxx.y;
        await page.mouse.wheel(0, y);
    }
    var Boolean = await frame.locator(inputdata.SSI).isVisible();
    expect(Boolean).toBeTruthy();
    await expect(frame.locator(inputdata.SSI)).toHaveText("Selected Strategy's Impact On Upper And Lower Levels");
    await page.waitForTimeout(3000);
    
})