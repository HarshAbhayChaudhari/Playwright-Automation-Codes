const {test,expect}= require('@playwright/test');
const logindata=JSON.parse(JSON.stringify(require('../../testdata/Logindata.json'))); //convert json file to string format and then create a object for converted file
const inputdata=JSON.parse(JSON.stringify(require('../../testdata/ID_Dashboard.json'))); //convert json file to string format and then create a object for converted file

test('Verify page and grid titles',async ({browser})=>
{
    let webContext;
    webContext = await browser.newContext({storageState:'LoginBypassCookies.json'});
    const page = await webContext.newPage();
    await page.goto(logindata.presaleslink);
     
    await page.frameLocator('#mfe').locator(inputdata.KPIImpact).waitFor();
    await expect(page.frameLocator('#mfe').locator(inputdata.KPIImpact)).toHaveText('KPI Impact');
    //await page.pause();
    await page.frameLocator('#mfe').locator("button >> nth=2").click();
    await page.frameLocator('#mfe').locator("text=Clear All >> nth=0").click();
    var bool = await page.frameLocator('#mfe').locator("h2[data-testid='lui-ccl-empty-state-heading'] >> nth=0").isVisible();
    expect(bool).toBeTruthy();


    
});