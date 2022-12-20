const {test,expect}= require('@playwright/test');
const logindata=JSON.parse(JSON.stringify(require('../../../testdata/Logindata.json'))); //convert json file to string format and then create a object for converted file

test('Filters grid workbench',async ({browser})=>
{
    let webContext1;
    webContext1 = await browser.newContext({storageState:'LoginBypassCookies.json'});
    const page = await webContext1.newPage(); // new page will be launched with browser context defined
    await page.goto(logindata.presaleslink);

    await page.frameLocator('#mfe').locator("text ='Workbench'").click();
    await expect(page.frameLocator('#mfe').locator("text='KPI Impact'")).toHaveText('KPI Impact');
    //await page.pause();
    
    var bool = await page.frameLocator('#mfe').locator("text=Aggregation Level").isVisible();
    expect(bool).toBeTruthy();
    await page.frameLocator('#mfe').locator("text=View Prices and KPIs in").waitFor();
    var bool = await page.frameLocator('#mfe').locator("text=View Prices and KPIs in").isVisible();
    expect(bool).toBeTruthy();
    var bool = await page.frameLocator('#mfe').locator("text=Locations").isVisible();
    expect(bool).toBeTruthy();
    var bool = await page.frameLocator('#mfe').locator("text=Products >> nth=0").isVisible();
    expect(bool).toBeTruthy();
    var bool = await page.frameLocator('#mfe').locator("text=Product Attributes").isVisible();
    expect(bool).toBeTruthy();
    var bool = await page.frameLocator('#mfe').locator("text=Additional Filters").isVisible();
    expect(bool).toBeTruthy();
    
})