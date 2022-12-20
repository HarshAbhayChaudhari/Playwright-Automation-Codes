const {test,expect, request}= require('@playwright/test');
const logindata=JSON.parse(JSON.stringify(require('../../../testdata/Logindata.json'))); //convert json file to string format and then create a object for converted file
const inputdata=JSON.parse(JSON.stringify(require('../../../testdata/ID_ScenarioAnalysis.json')));
let webContext2;
//let webContext3;

test( 'clear selection action in location section',async({browser})=>
{
    //for acme variable webContext3 and ScenarioAnalysisAcmeLogindata.json
    webContext2 = await browser.newContext({storageState:'LoginBypassCookies.json'});
    const page = await webContext2.newPage(); //for acme webcontext3
    await page.goto(logindata.presaleslink); //for acme link1
    const frame = page.frameLocator('#mfe');
    await frame.locator(inputdata.ScenarioAnalysis).click();
    await page.waitForTimeout(3000);
    //for acme (inputdata.AcmeAggregationLevelOption_2) in the place of (inputdata.AggregationLevelOption_2)
    var Country = await frame.locator(inputdata.AggregationLevelOption_2).isEnabled();
    expect(Country).toBeTruthy();
    await frame.locator(inputdata.AggregationLevelOption_2).click();
    await page.waitForTimeout(2000);
    var bool = await frame.locator(inputdata.LocationSearchBarField).isVisible();
    expect(bool).toBeTruthy();
    await frame.locator(inputdata.LocationSearchBarField).click();
    await page.waitForTimeout(2000);
    var boolean = await frame.locator(inputdata.LocationsOption_1).isEnabled();
    expect(boolean).toBeTruthy();
    await frame.locator(inputdata.LocationsOption_1).click();
    await page.waitForTimeout(2000);
    var Boolean = await frame.locator(inputdata.ClearSelection).isEnabled();
    expect(Boolean).toBeTruthy();
    await frame.locator(inputdata.ClearSelection).click();

    var boolean = await frame.locator(inputdata.LocationsOption_1).isEnabled(); //after clearSelection option1 get enabled
    expect(boolean).toBeTruthy();
    await page.waitForTimeout(2000);
    var Done = await frame.locator(inputdata.Done).isEnabled();
    expect(Done).toBeTruthy();
    await frame.locator(inputdata.Done).click();

    
})