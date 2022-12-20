const {test,expect, request}= require('@playwright/test');
const logindata=JSON.parse(JSON.stringify(require('../../../testdata/Logindata.json'))); //convert json file to string format and then create a object for converted file
const inputdata=JSON.parse(JSON.stringify(require('../../../testdata/ID_ScenarioAnalysis.json')));
let webContext2;
//let webContext3;

test( 'Radio button action in product section ',async({browser})=>
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
    await page.waitForTimeout(2000);
    let git =frame.locator(inputdata.AdditionalFilters);
    const box = await git.boundingBox();
    if(box){
        const y = box.y;
        await page.mouse.wheel(0, y);
    }
    await frame.locator(inputdata.ProductsOption_1ExpansionIcon).waitFor();
    await frame.locator(inputdata.ProductsOption_1ExpansionIcon).click();
    //for acme ("text=Display") in the place of ("text=PATIO")
    await frame.locator("text=PATIO").waitFor();
    await frame.locator(inputdata.ProductsOption_1_1ExpansionIcon).click();
    //for acme ("text=Department")in the place of ("text=FURNITURE")
    await frame.locator("text=FURNITURE").waitFor();
    await frame.locator(inputdata.ProductsOption_1_2ExpansionIcon).click();
    //for acme ("text=Training")in the place of ("text=TABLES & CHAIRS")
    await frame.locator("text=TABLES & CHAIRS").waitFor();
    await frame.locator(inputdata.ProductsOption_1_3ExpansionIcon).click();
    //for acme ("text=Accompaniments")in the place of ("text=PHI VILLA 5 PCS PATIO DINING SET")
    await frame.locator("text=PHI VILLA 5 PCS PATIO DINING SET").waitFor();

    var boolean = await frame.locator(inputdata.ProductsOption_5).isEnabled();
    expect(boolean).toBeTruthy();
    await frame.locator(inputdata.ProductsOption_5).click();
    var Done = await frame.locator(inputdata.Done).isEnabled();
    expect(Done).toBeTruthy();
    await frame.locator(inputdata.Done).click();
    //for acme (inputdata.AcmeExpansionAfterSelectedProductsOption_1_5) in the place of (inputdata.ExpansionAfterSelectedProductsOption_1_5)
    var text = await frame.locator(inputdata.ExpansionAfterSelectedProductsOption_1_5).isVisible();
    expect(text).toBeTruthy();
   
    var Apply = await frame.locator(inputdata.Apply).isEnabled();
    expect(Apply).toBeTruthy();
    await frame.locator(inputdata.Apply).click();
    await page.waitForTimeout(2000);

    var bool = await frame.locator(inputdata.SC_StrategyRadio_4).isEnabled();
    expect(bool).toBeTruthy();
    await frame.locator(inputdata.SC_StrategyRadio_4).click();
    let gitt =frame.locator("text=PHI VILLA 5 PCS PATIO DINING SET >> nth=1");
    const boxx = await gitt.boundingBox();
    if(boxx){
        const y = boxx.y;
        await page.mouse.wheel(0, y);
    }
    var bool = await frame.locator(inputdata.SSI).isVisible();
    expect(bool).toBeTruthy();
    var bool = await frame.locator("text=Product Hierarchy").isVisible();
    expect(bool).toBeTruthy();
    
    var bool = await frame.locator("text=PHI VILLA 5 PCS PATIO DINING SET >> nth=1").isVisible();
    expect(bool).toBeTruthy()
    var bool = await frame.locator("text=PHI VILLA 5 PCS PATIO DINING SET >> nth=2").isVisible();
    expect(bool).toBeTruthy()
   
    
})