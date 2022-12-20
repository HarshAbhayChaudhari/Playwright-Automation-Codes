const {test,expect, request}= require('@playwright/test');
const logindata=JSON.parse(JSON.stringify(require('../../../testdata/Logindata.json'))); //convert json file to string format and then create a object for converted file
const inputdata=JSON.parse(JSON.stringify(require('../../../testdata/ID_ScenarioAnalysis.json')));
let webContext2;
//let webContext3;

test( 'Verify user can select and execute a search in Locations section in the Filters grid with Location aggregation level',async({browser})=>
{
    //for acme variable webContext3 and ScenarioAnalysisAcmeLogindata.json
    webContext2 = await browser.newContext({storageState:'LoginBypassCookies.json'});
    const page = await webContext2.newPage(); //for acme webContext3
    await page.goto(logindata.presaleslink); //for acme link1
    
    const frame = page.frameLocator('#mfe');
    await frame.locator(inputdata.ScenarioAnalysis).click();
    await page.waitForTimeout(3000);

    var filters = await frame.locator(inputdata.Filters).isVisible();
    expect(filters).toBeTruthy();

    await expect(frame.locator(inputdata.Filters)).toHaveText("Filters");
    var bool = await frame.locator(inputdata.SC).isVisible();
    expect(bool).toBeTruthy();

    await expect(frame.locator(inputdata.SC)).toHaveText("Strategy Comparison"); 
    let git = frame.locator(inputdata.SSI);
    const box = await git.boundingBox();
    if(box){
        const y = box.y;
        await page.mouse.wheel(0, y);
    }
    
    var Boolean = await frame.locator(inputdata.SSI).isVisible();
    expect(Boolean).toBeTruthy();
    await expect(frame.locator(inputdata.SSI)).toHaveText("Selected Strategy's Impact On Upper And Lower Levels");
    await page.waitForTimeout(3000);

});