const {test,expect}= require('@playwright/test');
const logindata=JSON.parse(JSON.stringify(require('../../../testdata/Logindata.json'))); //convert json file to string format and then create a object for converted file

test('Verify the default grids in Workbench',async ({browser})=>
{
    let webContext1;
    webContext1 = await browser.newContext({storageState:'LoginBypassCookies.json'});
    const page = await webContext1.newPage(); // new page will be launched with browser context defined
    await page.goto(logindata.presaleslink);

    await page.frameLocator('#mfe').locator("text ='Workbench'").click(); // click workbench page
    await page.frameLocator('#mfe').locator("text='KPI Impact'").waitFor();
    await expect(page.frameLocator('#mfe').locator("text='KPI Impact'")).toHaveText('KPI Impact');

   
    //await page.pause();
    var bool = await page.frameLocator('#mfe').locator("text=Filters >> nth=0").isVisible();
    expect(bool).toBeTruthy();
    var bool = await page.frameLocator('#mfe').locator("text=Price Recommendations").isVisible();
    expect(bool).toBeTruthy();
    var bool = await page.frameLocator('#mfe').locator("text=KPI Impact").isVisible();
    expect(bool).toBeTruthy();
    let gitt = page.frameLocator('#mfe').locator("text=Additional Filters");
    
    const boxx = await gitt.boundingBox();
    if(boxx){
        const y = boxx.y;
        await page.mouse.wheel(0, y);
    }
    var bool = await page.frameLocator('#mfe').locator("text=Product Attributes").isVisible();
    expect(bool).toBeTruthy();
    var bool = await page.frameLocator('#mfe').locator("text=Additional Filters").isVisible();
    expect(bool).toBeTruthy();
})