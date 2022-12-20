const {test,expect, request}= require('@playwright/test');
const logindata=JSON.parse(JSON.stringify(require('../../../testdata/Logindata.json'))); //convert json file to string format and then create a object for converted file
const inputdata=JSON.parse(JSON.stringify(require('../../../testdata/ID_ScenarioAnalysis.json')));
let webContext2;
//let webContext3;

test( 'Additional Filters dropdown ',async({browser})=>
{
    //for acme variable webContext3 and ScenarioAnalysisAcmeLogindata.json
    webContext2 = await browser.newContext({storageState:'LoginBypassCookies.json'});
    const page = await webContext2.newPage(); //for acme webContext3
    await page.goto(logindata.presaleslink); //for acme link1
    const frame = page.frameLocator('#mfe');
    await frame.locator(inputdata.ScenarioAnalysis).click();
    await page.waitForTimeout(3000);
    //for acme (inputdata.AcmeAdditionalFilters_DD) in the place of (inputdata.AdditionalFilters_DD)
    let git = frame.locator(inputdata.AdditionalFilters_DD);
    const box = await git.boundingBox();
    if(box){
        const y = box.y;
        await page.mouse.wheel(0, y);
    }
    await git.click();
    await page.waitForTimeout(3000);
    await frame.locator(inputdata.ScheduleActiveDate).waitFor();
    var bool = await frame.locator(inputdata.ScheduleActiveDate).isVisible();
    expect(bool).toBeTruthy();
    var bool = await frame.locator(inputdata.AdditionalFiltersStrategy_DD).isVisible();
    expect(bool).toBeTruthy();
    await page.waitForTimeout(1000);
    await frame.locator(inputdata.AdditionalFiltersStrategy_DD).click();
    await frame.locator(inputdata.AdditionalFiltersStrategyOption_2).waitFor();
    await frame.locator(inputdata.AdditionalFiltersStrategyOption_2).click();
    await page.waitForTimeout(3000);
    
    // let gitt = frame.locator(inputdata.Apply);
    // const boxx = await gitt.boundingBox();
    // if(box){
    //     const y = boxx.y;
    //     await page.mouse.wheel(0, y);
    // }
    // await gitt.click();
    
    //await page.pause();

})