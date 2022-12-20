const {test,expect}= require('@playwright/test');
const logindata=JSON.parse(JSON.stringify(require('../../testdata/Logindata.json'))); //convert json file to string format and then create a object for converted file
let webContext;
const inputdata=JSON.parse(JSON.stringify(require('../../testdata/ID_Dashboard.json'))); //convert json file to string format and then create a object for converted file

test('Verify the Plus(+) and Minus(-) feature for KPIs additions in KPI Impact Settings pop up',async ({browser})=>
{
    webContext = await browser.newContext({storageState:'LoginBypassCookies.json'});
    const page = await webContext.newPage();
    await page.goto(logindata.presaleslink);
     
    await page.frameLocator('#mfe').locator(inputdata.KPIImpact).waitFor();
    await expect(page.frameLocator('#mfe').locator(inputdata.KPIImpact)).toHaveText('KPI Impact');

    //await page.pause();
    //This test case is working when we use page.pause();
    await page.frameLocator('#mfe').locator(inputdata.Settings).click();
    await page.frameLocator('#mfe').locator("button >> svg[focusable='false'] >> nth=4").click();
    let git = page.frameLocator('#mfe').locator(inputdata.SaveSettings);
    const box = await git.boundingBox();
    if(box){
        const y = box.y;
        await page.mouse.wheel(0, y);
    }
    //await page.frameLocator('#mfe').locator("[data-testid='close-modal-btn']").click();
    await git.click();
    await page.frameLocator('#mfe').locator(inputdata.Settings).click();
    
    await page.frameLocator('#mfe').locator("text=Available KPIs (1)").waitFor();
    var bool = await page.frameLocator('#mfe').locator("text=Available KPIs (1)").isVisible();
    expect(bool).toBeTruthy();


    //await page.pause();
});