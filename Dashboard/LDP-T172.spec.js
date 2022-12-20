const {test,expect}= require('@playwright/test');
const logindata=JSON.parse(JSON.stringify(require('../../testdata/Logindata.json'))); //convert json file to string format and then create a object for converted file
const inputdata=JSON.parse(JSON.stringify(require('../../testdata/ID_Dashboard.json'))); //convert json file to string format and then create a object for converted file

test('Verify the Close icon in Product hierarchy search is dispalyed and working',async ({browser})=>
{
    let webContext;
    webContext = await browser.newContext({storageState:'LoginBypassCookies.json'});
    const page = await webContext.newPage();
    await page.goto(logindata.presaleslink);

    await page.frameLocator('#mfe').locator(inputdata.KPIImpact).waitFor();
    await expect(page.frameLocator('#mfe').locator(inputdata.KPIImpact)).toHaveText('KPI Impact');

    //Clicking on the dropdown 
    await page.frameLocator('#mfe').locator(inputdata.ProductHierarchy_DD).click();
    await page.frameLocator('#mfe').locator(inputdata.CloseSmall).click();
    var bool = await page.frameLocator('#mfe').locator(inputdata.CloseSmall).isVisible();
    expect(bool).toBeFalsy();

    //await page.pause();
});