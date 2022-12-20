const {test,expect, request}= require('@playwright/test');
const logindata=JSON.parse(JSON.stringify(require('../../../testdata/Logindata.json'))); //convert json file to string format and then create a object for converted file
const inputdata=JSON.parse(JSON.stringify(require('../../../testdata/ID_ScenarioAnalysis.json')));
let webContext2;
//let webContext3;

test( 'verify aggregation select level in filters grid',async({browser})=>
{
    //for acme variable webContext3 and ScenarioAnalysisAcmeLogindata.json
    webContext2 = await browser.newContext({storageState:'LoginBypassCookies.json'});
    const page = await webContext2.newPage();
    await page.goto(logindata.presaleslink);
    const frame = page.frameLocator('#mfe');
    await frame.locator(inputdata.ScenarioAnalysis).click();
    await page.waitForTimeout(3000);
    await expect(frame.locator(inputdata.AggregationLevel)).toHaveText("Aggregation Level");
    await page.waitForTimeout(3000);
    var All = await frame.locator(inputdata.AggregationLevelOption_1).isVisible();
    expect(All).toBeTruthy();
    
    //for acme (inputdata.AcmeAggregationLevelOption_2) in the place of (inputdata.AggregationLevelOption_2)
    var Country = await frame.locator(inputdata.AggregationLevelOption_2).isVisible();
    expect(Country).toBeTruthy();
    

    //for acme comment prize zone lines bcoz this button is not present in acme

    var PriceZone = await frame.locator(inputdata.AggregationLevelOption_3).isVisible();
    expect(PriceZone).toBeTruthy();
    

    //for acme (input.AcmeAggregationLevelOption_3) in the place of (inputdata.AggregationLevelOption_4)
    var Location = await frame.locator(inputdata.AggregationLevelOption_4).isVisible();
    expect(Location).toBeTruthy();
    
    await page.waitForTimeout(3000);
})