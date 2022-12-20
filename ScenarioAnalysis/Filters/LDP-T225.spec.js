const {test,expect, request}= require('@playwright/test');
const logindata=JSON.parse(JSON.stringify(require('../../../testdata/Logindata.json'))); //convert json file to string format and then create a object for converted file
const inputdata=JSON.parse(JSON.stringify(require('../../../testdata/ID_ScenarioAnalysis.json')));
let webContext2;
//let webcontext3;
test( 'enter input in Location section search bar',async({browser})=>
{
    //for acme variable webContext3 and ScenarioAnalysisAcmeLogindata.json
    webContext2 = await browser.newContext({storageState:'LoginBypassCookies.json'});
    const page = await webContext2.newPage(); //for acme webcontext3
    await page.goto(logindata.presaleslink); //for acme link1
    const frame = page.frameLocator('#mfe');
    await frame.locator(inputdata.ScenarioAnalysis).click();
    //for acme (inputdata.AcmeAggregationLevelOption_2) in the place of (inputdata.AggregationLevelOption_2)
    var Country = await frame.locator(inputdata.AggregationLevelOption_2).isEnabled();
    expect(Country).toBeTruthy();
    await frame.locator(inputdata.AggregationLevelOption_2).click();
    await frame.locator(inputdata.LocationSearchBarField).waitFor();
    var bool = await frame.locator(inputdata.LocationSearchBarField).isEnabled();
    expect(bool).toBeTruthy();
    await frame.locator(inputdata.LocationSearchBarField).click();

    let git = frame.locator(inputdata.AdditionalFilters);
    const box = await git.boundingBox();
    if(box){
        const y = box.y;
        await page.mouse.wheel(0, y);
    }
    
    await frame.locator(inputdata.LocationHierarchySearchField).waitFor();
    //for acme 'Malaysia' in the place of 'US'
    await frame.locator(inputdata.LocationHierarchySearchField).type('US',{delay:100});
    await page.waitForTimeout(3000);
    
    //for acme ('Malaysia') in the place of ('US')
    await frame.locator("[data-testid='hierarchy-selector'] >> text=US").waitFor();
    var bool = await frame.locator("[data-testid='hierarchy-selector'] >> text=US").isVisible();
    expect(bool).toBeTruthy();
    
    
})