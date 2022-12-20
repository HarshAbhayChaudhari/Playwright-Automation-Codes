const {test,expect}= require('@playwright/test');
const logindata=JSON.parse(JSON.stringify(require('../../testdata/Logindata.json'))); //convert json file to string format and then create a object for converted file
const inputdata=JSON.parse(JSON.stringify(require('../../testdata/ID_Dashboard.json'))); //convert json file to string format and then create a object for converted file

test('Verify the Pagination icon in KPI Impact grid',async ({browser})=>
{
    let webContext;
    webContext = await browser.newContext({storageState:'LoginBypassCookies.json'});
    const page = await webContext.newPage();
    await page.goto(logindata.presaleslink);
     
    await page.frameLocator('#mfe').locator("text='KPI Impact'").waitFor();
    await expect(page.frameLocator('#mfe').locator("text='KPI Impact'")).toHaveText('KPI Impact');

    //await page.pause();
    
    await page.frameLocator('#mfe').locator(inputdata.Sales).waitFor();
    var bool = await page.frameLocator('#mfe').locator(inputdata.Sales).isVisible();
    expect(bool).toBeTruthy();
    await page.frameLocator('#mfe').locator("button >> nth=4").click();
    var bool = await page.frameLocator('#mfe').locator(inputdata.SalesAfterReturns).isVisible();
    expect(bool).toBeTruthy();
    

    //await page.pause();
});