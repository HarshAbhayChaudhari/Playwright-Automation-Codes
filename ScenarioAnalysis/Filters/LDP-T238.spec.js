const {test,expect, request}= require('@playwright/test');
const logindata=JSON.parse(JSON.stringify(require('../../../testdata/Logindata.json'))); //convert json file to string format and then create a object for converted file
const inputdata=JSON.parse(JSON.stringify(require('../../../testdata/ID_ScenarioAnalysis.json')));
let webContext2;
//let webContext3;

test( 'Tree expansion action in location section ',async({browser})=>
{
    //for acme variable webContext3 and ScenarioAnalysisAcmeLogindata.json
    webContext2 = await browser.newContext({storageState:'LoginBypassCookies.json'});
    const page = await webContext2.newPage(); //for acme webcontext3
    await page.goto(logindata.presaleslink); //for acme link1
    const frame = page.frameLocator('#mfe');
    await frame.locator(inputdata.ScenarioAnalysis).click();
    //for acme (inputdata.AcmeAggregationLevelOption_3) in the place of (inputdata.AggregationLevelOption_4)
    var bool = await frame.locator(inputdata.AggregationLevelOption_4).isEnabled();
    expect(bool).toBeTruthy();
    await frame.locator(inputdata.AggregationLevelOption_4).click();
    var bool = await frame.locator(inputdata.LocationSearchBarField).isVisible();
    expect(bool).toBeTruthy();
    await frame.locator(inputdata.LocationSearchBarField).click();
    let git = frame.locator(inputdata.AdditionalFilters);
    const box = await git.boundingBox();
    if(box){
        const y = box.y;
        await page.mouse.wheel(0, y);
    }
   
    await frame.locator(inputdata.LocationsOption_1ExpansionIcon).waitFor();
    await frame.locator(inputdata.LocationsOption_1ExpansionIcon).click();
    //for acme ("text=City Center") in the place of ("text=North Region") 
    await frame.locator("text=North Region").waitFor();
    await page.waitForTimeout(2000);
    //for acme comment 2 expansion icon bcoz 2nd expansion is not present in acme 

    await frame.locator(inputdata.LocationsOption_2ExpansionIcon).click();
    await frame.locator("text=Denver").waitFor();
    await page.waitForTimeout(3000);
})