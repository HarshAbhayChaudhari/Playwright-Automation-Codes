const {test,expect, request}= require('@playwright/test');
const logindata=JSON.parse(JSON.stringify(require('../../../testdata/Logindata.json'))); //convert json file to string format and then create a object for converted file
const inputdata=JSON.parse(JSON.stringify(require('../../../testdata/ID_ScenarioAnalysis.json')));
let webContext2;
//let webContext3;

test( 'Tree contraction action in product section ',async({browser})=>
{
    //for acme variable webContext3 and ScenarioAnalysisAcmeLogindata.json
    webContext2 = await browser.newContext({storageState:'LoginBypassCookies.json'});
    const page = await webContext2.newPage(); //for acme webcontext3
    await page.goto(logindata.presaleslink); //for acme link1
    const frame = page.frameLocator('#mfe');
    await frame.locator(inputdata.ScenarioAnalysis).click();
    await page.waitForTimeout(3000);
    var bool =await frame.locator(inputdata.ProductSearchBarField).isVisible();
    expect(bool).toBeTruthy();
    await frame.locator(inputdata.ProductSearchBarField).click();
    //await page.pause();
    let git = frame.locator(inputdata.AdditionalFilters);
    const box = await git.boundingBox();
    if(box){
        const y = box.y;
        await page.mouse.wheel(0, y);
    }
    await git.textContent();
    //await page.pause();
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
    
    await frame.locator(inputdata.ProductsOption_1_3ExpansionIcon).click();
    await frame.locator("text=FURNITURE").waitFor();
    await page.waitForTimeout(2000);
    await frame.locator(inputdata.ProductsOption_1_2ExpansionIcon).click();
    await frame.locator("text=PATIO").waitFor();
    
    await frame.locator(inputdata.ProductsOption_1_1ExpansionIcon).click();
    await frame.locator("text=GARDEN & OUTDOORS").waitFor();

    await frame.locator(inputdata.ProductsOption_1ExpansionIcon).click();
    await frame.locator("[data-testid='hierarchy-selector'] span:has-text('All')").waitFor();
    await page.waitForTimeout(3000);
})