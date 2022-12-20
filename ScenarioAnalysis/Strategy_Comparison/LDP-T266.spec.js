const {test,expect, request}= require('@playwright/test');
const logindata=JSON.parse(JSON.stringify(require('../../../testdata/Logindata.json'))); //convert json file to string format and then create a object for converted file
const inputdata=JSON.parse(JSON.stringify(require('../../../testdata/ID_ScenarioAnalysis.json')));
let webContext2;
//let webContext3;

test( 'Verify that all the records in the Strategy Comparision grid should be loaded in a default behaviour after clicking on Reset button',async({browser})=>
{
    //for acme variable webContext3 and ScenarioAnalysisAcmeLogindata.json
    webContext2 = await browser.newContext({storageState:'LoginBypassCookies.json'});
    const page = await webContext2.newPage(); //for acme webContext3
    await page.goto(logindata.presaleslink); //for acme link1
    const frame = page.frameLocator('#mfe');
    await frame.locator(inputdata.ScenarioAnalysis).click();
    await page.waitForTimeout(3000);
    //for acme (inputdata.AcmeAggregationLevelOption_2) in the place of (inputdata.AggregationLevelOption_2)
    var location = frame.locator(inputdata.AggregationLevelOption_2).isEnabled();
    expect(location).toBeTruthy();
    await frame.locator(inputdata.AggregationLevelOption_2).click();
    await frame.locator(inputdata.LocationSearchBarField).waitFor();
    await frame.locator(inputdata.LocationSearchBarField).click();
    let git = frame.locator(inputdata.AddFilters);
    const box = await git.boundingBox();
    if(box){
        const y = box.y;
        await page.mouse.wheel(0, y);
    }
    await git.textContent();
    await page.waitForTimeout(3000);
    var option = await frame.locator(inputdata.LocationsOption_1).isEnabled();
    expect(option).toBeTruthy();
    await frame.locator(inputdata.LocationsOption_1).click();
    var done = await frame.locator(inputdata.Done).isEnabled();
    expect(done).toBeTruthy();
    await frame.locator(inputdata.Done).click();
//for acme (inputdata.AcmeAfterSelectedLocationsOption_1) in the place of (inputdata.AfterSelectedLocationsOption_1)
    var text = await frame.locator(inputdata.AfterSelectedLocationsOption_1).isVisible();
    expect(text).toBeTruthy();
    await frame.locator(inputdata.Apply).waitFor();
    var apply = await frame.locator(inputdata.Apply).isEnabled();
    expect(apply).toBeTruthy();
    await frame.locator(inputdata.Apply).click();
    var bool = await frame.locator(inputdata.SC_StrategyRadio_2).isEnabled();
    expect(bool).toBeTruthy();
    await frame.locator(inputdata.SC_StrategyRadio_2).click();

    let gitt = frame.locator("text=US >> nth=1");
    const boxx = await gitt.boundingBox();
    if(box){
        const y = boxx.y;
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
    await page.waitForTimeout(2000);
    
    let gittt = frame.locator(inputdata.SC);
    const boxxx = await gittt.boundingBox();
    if(boxx){
        const y = boxxx.y;
        await page.mouse.wheel(0, y);
    }
    await page.waitForTimeout(3000);
    var reset = await frame.locator(inputdata.Reset).isEnabled();
    expect(reset).toBeTruthy();
    await frame.locator(inputdata.Reset).click();
    await page.waitForTimeout(3000);
    let gitttt = frame.locator("td[role='cell'] >> text=All >> nth=2");
    const boxxxx = await gitttt.boundingBox();
    if(boxxxx){
        const y = boxxxx.y;
        await page.mouse.wheel(0, y);
    }
    var bool = await frame.locator("text=Location Hierarchy").isVisible();
    expect(bool).toBeTruthy();
    var bool = await frame.locator("td[role='cell'] >> text=All >> nth=2").isVisible();
    expect(bool).toBeTruthy();
    var bool = await frame.locator("td[role='cell'] >> text=All >> nth=3").isVisible();
    expect(bool).toBeTruthy();
    await page.waitForTimeout(3000);
    
})