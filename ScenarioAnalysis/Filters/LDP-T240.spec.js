const {test,expect, request}= require('@playwright/test');
const logindata=JSON.parse(JSON.stringify(require('../../../testdata/Logindata.json'))); //convert json file to string format and then create a object for converted file
const inputdata=JSON.parse(JSON.stringify(require('../../../testdata/ID_ScenarioAnalysis.json')));
let webContext2;
//let webContext3;

test( 'Radio button action in location section ',async({browser})=>
{
    //for acme variable webContext3 and ScenarioAnalysisAcmeLogindata.json
    webContext2 = await browser.newContext({storageState:'LoginBypassCookies.json'});
    const page = await webContext2.newPage(); //for acme webcontext3
    await page.goto(logindata.presaleslink); //for acme link1
    const frame = page.frameLocator('#mfe');
    await frame.locator(inputdata.ScenarioAnalysis).click();
    
    //for acme (inputdata.AcmeAggregationLevelOption_3) in the place of (inputdata.AggregationLevelOption_3)
    var Boolean = await frame.locator(inputdata.AggregationLevelOption_3).isEnabled();
    expect(Boolean).toBeTruthy();
    await frame.locator(inputdata.AggregationLevelOption_3).click();
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
    var boolean = await frame.locator(inputdata.LocationsOption_2).isEnabled();
    expect(boolean).toBeTruthy();
    await frame.locator(inputdata.LocationsOption_2).click();
    await page.waitForTimeout(2000);
    var Done = await frame.locator(inputdata.Done).isEnabled();
    expect(Done).toBeTruthy();
    await frame.locator(inputdata.Done).click();
    
    //for acme (inputdata.AcmeAfterSelectedLocationsOption_1_1) in the place of (inputdata.AfterSelectedLocationsOption_2)
    var text = await frame.locator(inputdata.AfterSelectedLocationsOption_2).isVisible();
    expect(text).toBeTruthy();
    
    var Apply = await frame.locator(inputdata.Apply).isEnabled();
    expect(Apply).toBeTruthy();
    await frame.locator(inputdata.Apply).click();
    await page.waitForTimeout(2000);

    var bool = await frame.locator(inputdata.SC_StrategyRadio_3).isEnabled();
    expect(bool).toBeTruthy();
    await frame.locator(inputdata.SC_StrategyRadio_3).click();
    let gitt = frame.locator("text=North Region >> nth=1");
    const boxx = await gitt.boundingBox();
    if(boxx){
        const y = boxx.y;
        await page.mouse.wheel(0, y);
    }
    var bool = await frame.locator(inputdata.SSI).isVisible();
    expect(bool).toBeTruthy();
    var bool = await frame.locator("text=Location Hierarchy").isVisible();
    expect(bool).toBeTruthy();
    var bool = await frame.locator("text=North Region >> nth=1").isVisible();
    expect(bool).toBeTruthy();
    var bool = await frame.locator("text=North Region >> nth=2").isVisible();
    expect(bool).toBeTruthy();
    await page.waitForTimeout(2000);
})