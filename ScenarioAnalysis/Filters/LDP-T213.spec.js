const {test,expect, request}= require('@playwright/test');
const logindata=JSON.parse(JSON.stringify(require('../../../testdata/Logindata.json'))); //convert json file to string format and then create a object for converted file
const inputdata=JSON.parse(JSON.stringify(require('../../../testdata/ID_ScenarioAnalysis.json')));
let webContext2;
//let webContext3;

test( 'Verify the default fields in search bar popup window in Products section on the Filters grid',async({browser})=>
{
    //for acme variable webContext3 and ScenarioAnalysisAcmeLogindata.json
    webContext2 = await browser.newContext({storageState:'LoginBypassCookies.json'});
    const page = await webContext2.newPage(); //for acme webContext3
    await page.goto(logindata.presaleslink); //for acme link1
    const frame = page.frameLocator('#mfe');
    await frame.locator(inputdata.ScenarioAnalysis).click();
    await page.waitForTimeout(3000);
    
    var bool = await frame.locator(inputdata.ProductSearchBarField).isEnabled();
    expect(bool).toBeTruthy();
    await frame.locator(inputdata.ProductSearchBarField).click(); //click on search bar of products
    await page.waitForTimeout(3000);
    let git = frame.locator(inputdata.AdditionalFilters);
    const box = await git.boundingBox();
    if(box){
        const y = box.y;
        await page.mouse.wheel(0, y);
    }
    await frame.locator(inputdata.GardenOutdoors).waitFor();
    var bool = await frame.locator(inputdata.GardenOutdoors).isVisible();
    expect(bool).toBeTruthy();
    var bool = await frame.locator(inputdata.HomeImprovement).isVisible();
    expect(bool).toBeTruthy();
    var ShowAll = await frame.locator(inputdata.ShowAll).isVisible();
    expect(ShowAll).toBeTruthy();
    
    var ShowSelectedOnly = await frame.locator(inputdata.ShowSelectedOnly).isVisible();
    expect(ShowSelectedOnly).toBeTruthy();
    
    var ClearSelection = await frame.locator(inputdata.ClearSelection).isVisible();
    expect(ClearSelection).toBeTruthy();
    
    var Done = await frame.locator(inputdata.Done).isVisible();
    expect(Done).toBeTruthy();
    
    var PopUpCloseIcon = await frame.locator(inputdata.PopUpCloseIcon).isVisible();
    expect(PopUpCloseIcon).toBeTruthy();
    
    await page.waitForTimeout(3000);
})