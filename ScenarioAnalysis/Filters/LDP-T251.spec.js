const {test,expect, request}= require('@playwright/test');
const logindata=JSON.parse(JSON.stringify(require('../../../testdata/Logindata.json'))); //convert json file to string format and then create a object for converted file
const inputdata=JSON.parse(JSON.stringify(require('../../../testdata/ID_ScenarioAnalysis.json')));
let webContext2;
//let webContext3;

test( 'select all in aggregation select level',async({browser})=>
{
    //for acme variable webContext3 and ScenarioAnalysisAcmeLogindata.json
    webContext2 = await browser.newContext({storageState:'LoginBypassCookies.json'});
    const page = await webContext2.newPage(); //for acme webContext3
    await page.goto(logindata.presaleslink); //for acme link1
    const frame = page.frameLocator('#mfe');
    await frame.locator(inputdata.ScenarioAnalysis).click();
    await page.waitForTimeout(3000);
    
    var boolean = await frame.locator(inputdata.AggregationLevelOption_1).isVisible();
    expect(boolean).toBeTruthy();
    await frame.locator(inputdata.AggregationLevelOption_1).click();
    await page.waitForTimeout(3000);
    var bool = await frame.locator(inputdata.LocationSearchBarField).isVisible();
    expect(bool).toBeTruthy();
    await frame.locator(inputdata.LocationSearchBarField).click();
    let git = frame.locator(inputdata.AdditionalFilters);
    const box = await git.boundingBox();
    if(box){
        const y = box.y;
        await page.mouse.wheel(0, y);
    }
    await frame.locator(inputdata.LocationsOption_0).waitFor();
    var All = await frame.locator(inputdata.LocationsOption_0).isEnabled();
    expect(All).toBeTruthy();
    await frame.locator(inputdata.LocationsOption_0).click();
    var US = await frame.locator(inputdata.LocationsOption_1).isDisabled();
    expect(US).toBeTruthy();
    await frame.locator(inputdata.LocationsOption_1ExpansionIcon).waitFor();
    await frame.locator(inputdata.LocationsOption_1ExpansionIcon).click();
    await page.waitForTimeout(3000);
    var NorthRegion = await frame.locator(inputdata.LocationsOption_2).isDisabled();
    expect(NorthRegion).toBeTruthy();
    await frame.locator(inputdata.LocationsOption_2ExpansionIcon).click();
    await page.waitForTimeout(2000);
    var SouthRegion = await frame.locator(inputdata.LocationsOption_3).isDisabled();
    expect(SouthRegion).toBeTruthy();
    var WestRegion = await frame.locator(inputdata.LocationsOption_4).isDisabled();
    expect(WestRegion).toBeTruthy();
    var EastRegion = await frame.locator(inputdata.LocationsOption_5).isDisabled();
    expect(EastRegion).toBeTruthy();
    
    
    
})