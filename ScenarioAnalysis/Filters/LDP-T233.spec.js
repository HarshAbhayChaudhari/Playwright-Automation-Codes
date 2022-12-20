const {test,expect, request}= require('@playwright/test');
const logindata=JSON.parse(JSON.stringify(require('../../../testdata/Logindata.json'))); //convert json file to string format and then create a object for converted file
const inputdata=JSON.parse(JSON.stringify(require('../../../testdata/ID_ScenarioAnalysis.json')));
let webContext2;
//let webContext3;

test( 'Done button action in location section pop up window',async({browser})=>
{
    //for acme variable webContext3 and ScenarioAnalysisAcmeLogindata.json
    webContext2 = await browser.newContext({storageState:'LoginBypassCookies.json'});
    const page = await webContext2.newPage(); //for acme webcontext3
    await page.goto(logindata.presaleslink); //for acme link1
    const frame = page.frameLocator('#mfe');
    await frame.locator(inputdata.ScenarioAnalysis).click();
    
    //for acme (inputdata.AcmeAggregationLevelOption_2) in the place of (inputdata.AggregationLevelOption_2)
    var bool = await frame.locator(inputdata.AggregationLevelOption_2).isEnabled();
    expect(bool).toBeTruthy();
    await frame.locator(inputdata.AggregationLevelOption_2).click();
    var boolean = await frame.locator(inputdata.LocationSearchBarField).isVisible();
    expect(boolean).toBeTruthy();
    await frame.locator(inputdata.LocationSearchBarField).click();
    await frame.locator(inputdata.LocationsOption_1).waitFor();
    var Boolean = await frame.locator(inputdata.LocationsOption_1).isEnabled();
    expect(Boolean).toBeTruthy();
    await frame.locator(inputdata.LocationsOption_1).click();
    await page.waitForTimeout(2000);
    var Done = await frame.locator(inputdata.Done).isEnabled();
    expect(Done).toBeTruthy();
    await frame.locator(inputdata.Done).click();
    //for acme (inputdata.AcmeAfterSelectedLocationsOption_1) in the place of (inputdata.AfterSelectedLocationsOption_1)
    var text = await frame.locator(inputdata.AfterSelectedLocationsOption_1).isVisible();
    expect(text).toBeTruthy();
    
    await frame.locator(inputdata.Apply).waitFor();
    var Apply = await frame.locator(inputdata.Apply).isEnabled();
    expect(Apply).toBeTruthy()
    await frame.locator(inputdata.Apply).click();
    await page.waitForTimeout(3000);

    var bool = await frame.locator(inputdata.SC_StrategyRadio_1).isEnabled();
    expect(bool).toBeTruthy();
    await frame.locator(inputdata.SC_StrategyRadio_1).click();

    let git = frame.locator("text=US >> nth=1");
    const box = await git.boundingBox();
    if(box){
        const y = box.y;
        await page.mouse.wheel(0, y);
    }
    var bool = await frame.locator(inputdata.SSI).isVisible();
    expect(bool).toBeTruthy();
    await page.waitForTimeout(3000);
    var bool = await frame.locator("text=Location Hierarchy").isVisible();
    expect(bool).toBeTruthy()
    var bool = await frame.locator("text=US >> nth=1").isVisible();
    expect(bool).toBeTruthy();
    var bool = await frame.locator("text=US >> nth=2").isVisible();
    expect(bool).toBeTruthy();
    await page.waitForTimeout(3000);
})