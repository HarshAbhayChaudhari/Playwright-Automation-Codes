const {test,expect}= require('@playwright/test');
const logindata=JSON.parse(JSON.stringify(require('../../testdata/Logindata.json'))); //convert json file to string format and then create a object for converted file
const inputdata=JSON.parse(JSON.stringify(require('../../testdata/ID_Dashboard.json'))); //convert json file to string format and then create a object for converted file

test('Verify the Show All hyperlink action in Location hierarchy search on KPI Impact grid',async ({browser})=>
{
    let webContext;
    webContext = await browser.newContext({storageState:'LoginBypassCookies.json'});
    const page = await webContext.newPage();
    await page.goto(logindata.presaleslink);
     
    await page.frameLocator('#mfe').locator(inputdata.KPIImpact).waitFor();
    await expect(page.frameLocator('#mfe').locator(inputdata.KPIImpact)).toHaveText('KPI Impact');

    await page.frameLocator('#mfe').locator(inputdata.LocationHierarchy_DD).click();
    await page.frameLocator('#mfe').locator("input[type='radio'] >> nth=1").click();
    await page.frameLocator('#mfe').locator(inputdata.ShowAll).click();
    await page.frameLocator('#mfe').locator(inputdata.Done).click();
    
    //await page.pause();
});