const {test,expect, request}= require('@playwright/test');
const logindata=JSON.parse(JSON.stringify(require('../../../testdata/Logindata.json'))); //convert json file to string format and then create a object for converted file
const inputdata=JSON.parse(JSON.stringify(require('../../../testdata/ID_ScenarioAnalysis.json')));
let webContext2;
//let webContext3;
test( 'show selected only action in product section ',async({browser})=>
{
    //for acme variable webContext3 and ScenarioAnalysisAcmeLogindata.json
    webContext2 = await browser.newContext({storageState:'LoginBypassCookies.json'});
    const page = await webContext2.newPage(); //for acme webcontext3
    await page.goto(logindata.presaleslink); //for acme link1
    const frame = page.frameLocator('#mfe');
    await frame.locator(inputdata.ScenarioAnalysis).click();
    await page.waitForTimeout(3000);
    var bool = await frame.locator(inputdata.ProductSearchBarField).isVisible();
    expect(bool).toBeTruthy();
    await frame.locator(inputdata.ProductSearchBarField).click();
    let git = frame.locator(inputdata.AdditionalFilters);
    const box = await git.boundingBox();
    if(box){
        const y = box.y;
        await page.mouse.wheel(0, y);
    }
    await git.textContent();
    var boolean = await frame.locator(inputdata.ProductsOption_3).isEnabled();
    expect(boolean).toBeTruthy();
    await frame.locator(inputdata.ProductsOption_3).click();
    var ShowSelectedOnly = await frame.locator(inputdata.ShowSelectedOnly).isEnabled();
    expect(ShowSelectedOnly).toBeTruthy();
    await frame.locator(inputdata.ShowSelectedOnly).click();
    await page.waitForTimeout(3000);
    var bool = await frame.locator("[data-testid='hierarchy-selector'] div:has-text('HOBBIES') >> nth=4").isVisible();
    expect(bool).toBeTruthy();
    var Done = await frame.locator(inputdata.Done).isEnabled();
    expect(Done).toBeTruthy();
    await frame.locator(inputdata.Done).click();
    
    //for acme(inputdata.AcmeAfterSelectedProductsOption_3) in the place of (inputdata.AfterSelectedProductsOption_3)
    var text = await frame.locator(inputdata.AfterSelectedProductsOption_3).isVisible();
    expect(text).toBeTruthy();
    
    var Apply = await frame.locator(inputdata.Apply).isEnabled();
    expect(Apply).toBeTruthy();
    await frame.locator(inputdata.Apply).click();
    await page.waitForTimeout(3000);

    var bool = await frame.locator(inputdata.SC_StrategyRadio_2).isEnabled();
    expect(bool).toBeTruthy();
    await frame.locator(inputdata.SC_StrategyRadio_2).click();

    let gitt = frame.locator("td[role='cell'] >> text=HOBBIES");
    const boxx = await gitt.boundingBox();
    if(boxx){
        const y = boxx.y;
        await page.mouse.wheel(0, y);
    }
    var bool = await frame.locator(inputdata.SSI).isVisible();
    expect(bool).toBeTruthy();
    var bool = await frame.locator("text=Product Hierarchy").isVisible();
    expect(bool).toBeTruthy();
    var bool = await frame.locator("td[role='cell'] >> text=HOBBIES").isVisible();
    expect(bool).toBeTruthy();
    await page.waitForTimeout(2000);
})