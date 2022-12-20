const {test,expect}= require('@playwright/test');
const logindata=JSON.parse(JSON.stringify(require('../../testdata/Logindata.json'))); //convert json file to string format and then create a object for converted file
const inputdata=JSON.parse(JSON.stringify(require('../../testdata/ID_Dashboard.json'))); //convert json file to string format and then create a object for converted file

test('Verify the Cancel button in KPI Settings',async ({browser})=>
{
    let webContext;
    webContext = await browser.newContext({storageState:'LoginBypassCookies.json'});
    const page = await webContext.newPage();
    await page.goto(logindata.presaleslink);
     
    await page.frameLocator('#mfe').locator(inputdata.KPIImpact).waitFor();
    await expect(page.frameLocator('#mfe').locator(inputdata.KPIImpact)).toHaveText('KPI Impact');
    //await page.pause();

    await page.frameLocator('#mfe').locator(inputdata.Settings).click();
    await page.frameLocator('#mfe').locator("text=Clear All >> nth=0").click();
    await page.frameLocator('#mfe').locator(inputdata.Cancel).click();
    await page.frameLocator('#mfe').locator(inputdata.Settings).click();
    var bool = await page.frameLocator('#mfe').locator("text=In Use KPIs (4)").isVisible();
    expect(bool).toBeTruthy();
    
    //await page.pause();
});