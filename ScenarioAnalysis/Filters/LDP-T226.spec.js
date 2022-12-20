const {test,expect, request}= require('@playwright/test');
const logindata=JSON.parse(JSON.stringify(require('../../../testdata/Logindata.json'))); //convert json file to string format and then create a object for converted file
const inputdata=JSON.parse(JSON.stringify(require('../../../testdata/ID_ScenarioAnalysis.json')));
let webContext2;
//let webcontext3;

test( 'enter input in Product section search bar',async({browser})=>
{
    //for acme variable webContext3 and ScenarioAnalysisAcmeLogindata.json
    webContext2 = await browser.newContext({storageState:'LoginBypassCookies.json'});
    const page = await webContext2.newPage(); //for acme webcontext3
    await page.goto(logindata.presaleslink); //for acme link1
    const frame = page.frameLocator('#mfe');
    await frame.locator(inputdata.ScenarioAnalysis).click();

    await frame.locator(inputdata.ProductSearchBarField).waitFor();
    let git = frame.locator(inputdata.ProductSearchBarField);
    const box = await git.boundingBox();
    if(box){
        const y = box.y;
        await page.mouse.wheel(0, y);
    }
    var bool = await frame.locator(inputdata.ProductSearchBarField).isEnabled();
    expect(bool).toBeTruthy();
    await frame.locator(inputdata.ProductSearchBarField).click();
    await page.waitForTimeout(3000);
    let gitt = frame.locator(inputdata.AdditionalFilters);
    const boxx = await gitt.boundingBox();
    if(box){
        const y = boxx.y;
        await page.mouse.wheel(0, y);
    }
    await frame.locator(inputdata.ProductHierarchySearchField).waitFor();
    //for acme 'Older' in the place of 'Hobbies'
    await frame.locator(inputdata.ProductHierarchySearchField).type('Hobbies',{delay:100})
    await page.waitForTimeout(3000);
    //for acme ("text=Older") in the place of ("text=HOBBIES")
    await frame.locator("text=HOBBIES").waitFor();
    var bool = await frame.locator("text=HOBBIES").isVisible();
    expect(bool).toBeTruthy();
   
    
})