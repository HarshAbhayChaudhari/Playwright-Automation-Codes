const {test,expect, request}= require('@playwright/test');
const logindata=JSON.parse(JSON.stringify(require('../../../testdata/Logindata.json'))); //convert json file to string format and then create a object for converted file
const inputdata=JSON.parse(JSON.stringify(require('../../../testdata/ID_ScenarioAnalysis.json')));
let webContext2;

test( 'Verify the Apply button in Filters grid',async({browser})=>
{

    webContext2 = await browser.newContext({storageState:'LoginBypassCookies.json'});
    const page = await webContext2.newPage();
    await page.goto(logindata.presaleslink);
    const frame = page.frameLocator('#mfe');
    await frame.locator(inputdata.ScenarioAnalysis).click();
    await page.waitForTimeout(3000);
    var bool = await frame.locator(inputdata.AggregationLevelOption_2).isEnabled();
    expect(bool).toBeTruthy();
    await frame.locator(inputdata.AggregationLevelOption_2).click();
    
    await frame.locator(inputdata.LocationSearchBarField).waitFor();
    await frame.locator(inputdata.LocationSearchBarField).click();
   
    var bool = await frame.locator(inputdata.LocationsOption_1).isEnabled();
    expect(bool).toBeTruthy();
    await frame.locator(inputdata.LocationsOption_1).click();

    await frame.locator(inputdata.Done).waitFor();
    var done = await frame.locator(inputdata.Done).isEnabled();
    expect(done).toBeTruthy();
    await frame.locator(inputdata.Done).click();
    //for acme (inputdata.AcmeAfterSelectedLocationsOption_1) in the place of (inputdata.AfterSelectedLocationsOption_1)
    var text = await frame.locator(inputdata.AfterSelectedLocationsOption_1).isVisible();
    expect(text).toBeTruthy();

    let git =  frame.locator(inputdata.AdditionalFilters);
    const box = await git.boundingBox();
    if(box){
        const y = box.y;
        await page.mouse.wheel(0,y);
    }
    var bool = await frame.locator(inputdata.ProductSearchBarField).isVisible();
    expect(bool).toBeTruthy();
    await frame.locator(inputdata.ProductSearchBarField).click();
    await frame.locator(inputdata.ProductsOption_1).waitFor();
    var boolean = await frame.locator(inputdata.ProductsOption_1).isEnabled();
    expect(boolean).toBeTruthy();
    await frame.locator(inputdata.ProductsOption_1).click();

    var Done = await frame.locator(inputdata.Done).isEnabled();
    expect(Done).toBeTruthy();
    await frame.locator(inputdata.Done).click();
    await page.waitForTimeout(2000);
    let gitt = frame.locator(inputdata.AdditionalFilters_DD);
    const boxx = await gitt.boundingBox();
    if(boxx){
        const y = boxx.y;
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
})