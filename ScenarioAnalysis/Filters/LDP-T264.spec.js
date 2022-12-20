const {test,expect, request}= require('@playwright/test');
const logindata=JSON.parse(JSON.stringify(require('../../../testdata/Logindata.json'))); //convert json file to string format and then create a object for converted file
const inputdata=JSON.parse(JSON.stringify(require('../../../testdata/ID_ScenarioAnalysis.json')));
let webContext2;
//let webContext3;
test( 'product attribute dropdown ',async({browser})=>
{
    //for acme variable webContext3 and ScenarioAnalysisAcmeLogindata.json
    webContext2 = await browser.newContext({storageState:'LoginBypassCookies.json'});
    const page = await webContext2.newPage(); //for acme webContext3;
    await page.goto(logindata.presaleslink); //for acme link1
    const frame = page.frameLocator('#mfe');
    await frame.locator(inputdata.ScenarioAnalysis).click();
    await page.waitForTimeout(3000);
    
    let git = frame.locator(inputdata.AdditionalFilters);
    const box = await git.boundingBox();
    if(box){
        const y = box.y;
        await page.mouse.wheel(0, y);
    }
    await git.textContent();
    await page.waitForTimeout(3000);
    //for acme(inputdata.AcmeProductAttributes_DD)
    var bool = await frame.locator(inputdata.ProductAttributes_DD).isEnabled();
    expect(bool).toBeTruthy();
    //for acme(inputdata.AcmeProductAttributes_DD)
    await frame.locator(inputdata.ProductAttributes_DD).click();
    await page.waitForTimeout(3000);

    var bool = await frame.locator("text=BuyerID​ >> div[role='button']").isVisible();
    expect(bool).toBeTruthy();
    await frame.locator("text=BuyerID​ >> div[role='button']").click();
    await page.waitForTimeout(2000);
})