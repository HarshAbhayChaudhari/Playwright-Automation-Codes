const {test,expect, request}= require('@playwright/test');
const logindata=JSON.parse(JSON.stringify(require('../../../testdata/Logindata.json'))); //convert json file to string format and then create a object for converted file
const inputdata=JSON.parse(JSON.stringify(require('../../../testdata/ID_ScenarioAnalysis.json')));
let webContext2;
//let webContext3;

test( 'Done button action in product section pop up window',async({browser})=>
{
    //for acme variable webContext3 and ScenarioAnalysisAcmeLogindata.json
    webContext2 = await browser.newContext({storageState:'LoginBypassCookies.json'});
    const page = await webContext2.newPage(); //for acme webcontext3
    await page.goto(logindata.presaleslink); //for acme link1
    const frame = page.frameLocator('#mfe');
    await frame.locator(inputdata.ScenarioAnalysis).click();
    
    await frame.locator(inputdata.ProductSearchBarField).waitFor();
    var bool = await frame.locator(inputdata.ProductSearchBarField).isVisible();
    expect(bool).toBeTruthy();
    await frame.locator(inputdata.ProductSearchBarField).click();
    
    var boolean = await frame.locator(inputdata.ProductsOption_1).isEnabled();
    expect(boolean).toBeTruthy();
    await frame.locator(inputdata.ProductsOption_1).click();
    await page
    await page.waitForTimeout(1000);
    let git = frame.locator(inputdata.Done);
    const box = await git.boundingBox();
    if(box){
        const y = box.y;
        await page.mouse.wheel(0, y);
    }
    await git.click();
    //for acme (inputdata.AcmeAfterSelectedProductsOption_1) in the place of (inputdata.AfterSelectedProductsOption_1)
    var text = await frame.locator(inputdata.AfterSelectedProductsOption_1).isVisible();
    expect(text).toBeTruthy();
   
    await page.waitForTimeout(1000);
    var Apply = await frame.locator(inputdata.Apply).isEnabled();
    expect(Apply).toBeTruthy();
    await frame.locator(inputdata.Apply).click();
    await page.waitForTimeout(3000);

    var bool = await frame.locator(inputdata.SC_StrategyRadio_2).isEnabled();
    expect(bool).toBeTruthy();
    await frame.locator(inputdata.SC_StrategyRadio_2).click();

    let gitt = frame.locator("td[role='cell'] >> text=GARDEN & OUTDOORS");
    const boxx = await gitt.boundingBox();
    if(boxx){
        const y = boxx.y;
        await page.mouse.wheel(0, y);
    }
    var bool = await frame.locator(inputdata.SSI).isVisible();
    expect(bool).toBeTruthy();
    await page.waitForTimeout(3000);
    var bool = await frame.locator("text=Product Hierarchy").isVisible();
    expect(bool).toBeTruthy();
   var bool = await frame.locator("td[role='cell'] >> text=GARDEN & OUTDOORS").isVisible();
    expect(bool).toBeTruthy();
})