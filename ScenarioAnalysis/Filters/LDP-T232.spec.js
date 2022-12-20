const {test,expect, request}= require('@playwright/test');
const logindata=JSON.parse(JSON.stringify(require('../../../testdata/Logindata.json'))); //convert json file to string format and then create a object for converted file
const inputdata=JSON.parse(JSON.stringify(require('../../../testdata/ID_ScenarioAnalysis.json')));
let webContext2;
//let webContext3;

test( 'Verify the default fields in search bar popup window in Locations section on the Filters grid',async({browser})=>
{
    //for acme variable webContext3 and ScenarioAnalysisAcmeLogindata.json
    webContext2 = await browser.newContext({storageState:'LoginBypassCookies.json'});
    const page = await webContext2.newPage(); //for acme webcontext3
    await page.goto(logindata.presaleslink); //for acme link1
    const frame = page.frameLocator('#mfe');
    await frame.locator(inputdata.ScenarioAnalysis).click();
    await page.waitForTimeout(3000);
    //for acme (inputdata.AcmeAggregationLevelOption_2) in the place of (inputdata.AggregationLevelOption_2)
    await frame.locator(inputdata.AggregationLevelOption_2).waitFor();
    var location = await frame.locator(inputdata.AggregationLevelOption_2).isEnabled();
    expect(location).toBeTruthy();
    await frame.locator(inputdata.AggregationLevelOption_2).click();
    await frame.locator(inputdata.LocationSearchBarField).waitFor();
    var bool = await frame.locator(inputdata.LocationSearchBarField).isVisible();
    expect(bool).toBeTruthy();
    await frame.locator(inputdata.LocationSearchBarField).click();
    var bool = await frame.locator("[data-testid='hierarchy-selector'] span:has-text('All')").isVisible();
    expect(bool).toBeTruthy();
    var bool = await frame.locator("[data-testid='hierarchy-selector'] div:has-text('US') >> nth=4").isVisible();
    expect(bool).toBeTruthy();
    
    var ShowAll = await frame.locator(inputdata.ShowAll).isVisible();
    expect(ShowAll).toBeTruthy();
    
    var ShowSelectedOnly = await frame.locator(inputdata.ShowSelectedOnly).isVisible();
    expect(ShowSelectedOnly).toBeTruthy();
    
    var ClearSelection = await frame.locator(inputdata.ClearSelection).isVisible();
    expect(ClearSelection).toBeTruthy();
    
    var Done = await frame.locator(inputdata.Done).isVisible();
    expect(Done).toBeTruthy();
    
    var PopUpCloseIcon = await frame.locator(inputdata.PopUpCloseIcon).isVisible();
    expect(PopUpCloseIcon).toBeTruthy();
    
    await page.waitForTimeout(3000);
    
})