const {test,expect, request}= require('@playwright/test');
const logindata=JSON.parse(JSON.stringify(require('../../../testdata/Logindata.json'))); //convert json file to string format and then create a object for converted file
const inputdata=JSON.parse(JSON.stringify(require('../../../testdata/ID_ScenarioAnalysis.json')));
let webContext2;
//let webContext2;

test( 'Country action in aggregation select level',async({browser})=>
{
    //for acme variable webContext3 and ScenarioAnalysisAcmeLogindata.json
    webContext2 = await browser.newContext({storageState:'LoginBypassCookies.json'}); 
    const page = await webContext2.newPage(); //for acme webContext3
    await page.goto(logindata.presaleslink); //for link1
    const frame = page.frameLocator('#mfe');
    await frame.locator(inputdata.ScenarioAnalysis).click();
    await page.waitForTimeout(3000);
    //for acme in place of(inputdata.AggregationLevelOption_2) as (inputdata.AcmeAggregationLevelOption_2)
    var boolean = await frame.locator(inputdata.AggregationLevelOption_2).isVisible();
    expect(boolean).toBeTruthy();
    await frame.locator(inputdata.AggregationLevelOption_2).click();
    await page.waitForTimeout(2000);
    var bool = await frame.locator(inputdata.LocationSearchBarField).isVisible();
    expect(bool).toBeTruthy();
    await frame.locator(inputdata.LocationSearchBarField).click();
    var All = await frame.locator(inputdata.LocationsOption_0).isEnabled();
    expect(All).toBeTruthy();
    await frame.locator(inputdata.LocationsOption_0).click();
    //for acme var Malaysia in the place of var US
    var US = await frame.locator(inputdata.LocationsOption_1).isEnabled();
    expect(US).toBeTruthy();
    await frame.locator(inputdata.LocationsOption_1).click();
    await frame.locator(inputdata.LocationsOption_1ExpansionIcon).waitFor();
    await frame.locator(inputdata.LocationsOption_1ExpansionIcon).click();
    await page.waitForTimeout(3000);
    var NorthRegion = await frame.locator(inputdata.LocationsOption_2).isDisabled();
    expect(NorthRegion).toBeTruthy();
    await frame.locator(inputdata.LocationsOption_2ExpansionIcon).click();

    var SouthRegion = await frame.locator(inputdata.LocationsOption_3).isDisabled();
    expect(SouthRegion).toBeTruthy();
    var WestRegion = await frame.locator(inputdata.LocationsOption_4).isDisabled();
    expect(WestRegion).toBeTruthy();
    var EastRegion = await frame.locator(inputdata.LocationsOption_5).isDisabled();
    expect(EastRegion).toBeTruthy();
    await page.waitForTimeout(3000);
    
    
})