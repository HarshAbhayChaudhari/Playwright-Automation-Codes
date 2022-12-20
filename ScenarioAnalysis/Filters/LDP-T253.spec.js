const {test,expect, request}= require('@playwright/test');
const logindata=JSON.parse(JSON.stringify(require('../../../testdata/Logindata.json'))); //convert json file to string format and then create a object for converted file
const inputdata=JSON.parse(JSON.stringify(require('../../../testdata/ID_ScenarioAnalysis.json')));
let webContext2;
//let webContext3;

test( 'Location action in aggregation select level',async({browser})=>
{
    //for acme variable webContext3 and ScenarioAnalysisAcmeLogindata.json
    webContext2 = await browser.newContext({storageState:'LoginBypassCookies.json'});
    const page = await webContext2.newPage(); //for acme webContext3
    await page.goto(logindata.presaleslink); //for acme link1
    const frame = page.frameLocator('#mfe');
    await frame.locator(inputdata.ScenarioAnalysis).click();
    await page.waitForTimeout(3000);
    //for acme in place of(inputdata.AggregationLevelOption_4) as (inputdata.AcmeAggregationLevelOption_3)
    var boolean = await frame.locator(inputdata.AggregationLevelOption_4).isVisible();
    expect(boolean).toBeTruthy();
    await frame.locator(inputdata.AggregationLevelOption_4).click();
    await page.waitForTimeout(2000);
    
    var bool = await frame.locator(inputdata.LocationSearchBarField).isVisible();
    expect(bool).toBeTruthy();
    await frame.locator(inputdata.LocationSearchBarField).click();
    var All = await frame.locator(inputdata.LocationsOption_0).isEnabled();
    expect(All).toBeTruthy();
    await frame.locator(inputdata.LocationsOption_0).click();
    var US = await frame.locator(inputdata.LocationsOption_1).isEnabled();
    expect(US).toBeTruthy();
    await frame.locator(inputdata.LocationsOption_1).click();

    await frame.locator(inputdata.LocationsOption_1ExpansionIcon).waitFor();
    await frame.locator(inputdata.LocationsOption_1ExpansionIcon).click();

    await page.waitForTimeout(2000);
    var NorthRegion = await frame.locator(inputdata.LocationsOption_2).isEnabled();
    expect(NorthRegion).toBeTruthy();
    await frame.locator(inputdata.LocationsOption_2).click();
    await frame.locator(inputdata.LocationsOption_2ExpansionIcon).click();
    await page.waitForTimeout(2000);
    var bool = await frame.locator(inputdata.LocationsOption_3).isEnabled();
    expect(bool).toBeTruthy();
    await frame.locator(inputdata.LocationsOption_3).click();
    var bool = await frame.locator(inputdata.LocationsOption_4).isEnabled();
    expect(bool).toBeTruthy();
    await frame.locator(inputdata.LocationsOption_4).click();
    var bool = await frame.locator(inputdata.LocationsOption_5).isEnabled();
    expect(bool).toBeTruthy();
    await frame.locator(inputdata.LocationsOption_5).click();
    await page.waitForTimeout(2000);
   
})