const {test,expect}= require('@playwright/test');
const logindata=JSON.parse(JSON.stringify(require('../../../testdata/Logindata.json'))); //convert json file to string format and then create a object for converted file

test('Location search bar',async ({browser})=>
{
    let webContext1;
    webContext1 = await browser.newContext({storageState:'LoginBypassCookies.json'});
    const page = await webContext1.newPage(); // new page will be launched with browser context defined
    await page.goto(logindata.presaleslink);

    await page.frameLocator('#mfe').locator("text ='Workbench'").click();
    await page.frameLocator('#mfe').locator("text='KPI Impact'").waitFor();
    await expect(page.frameLocator('#mfe').locator("text='KPI Impact'")).toHaveText('KPI Impact');
    //await page.pause();
    
    await page.frameLocator('#mfe').locator("[data-testid='product-SearchField'] [data-testid='search-field']").click();
    await page.frameLocator('#mfe').locator("[data-testid='hierarchy-selector'] input[type='checkbox'] >> nth=0").click();
    await page.frameLocator('#mfe').locator("div:nth-child(2) > .MuiGrid-root > span").click();
    await page.frameLocator('#mfe').locator("text=PATIO").waitFor();
    await page.frameLocator('#mfe').locator("div:nth-child(3) > .MuiGrid-root > span").click();
    await page.frameLocator('#mfe').locator("text=FURNITURE").waitFor();
    let gitt = page.frameLocator('#mfe').locator("text=GROCERY");
    //Store the Workbench price recommendations column locators in a locator file and access from that file into your test case.
    const boxx = await gitt.boundingBox();
    if(boxx){
        const x = boxx.x;
        await page.mouse.wheel(0, x);
    }
    await page.frameLocator('#mfe').locator("div:nth-child(4) > .MuiGrid-root > span").click();
    await page.frameLocator('#mfe').locator("text=TABLES & CHAIRS").waitFor();
    await page.frameLocator('#mfe').locator("div:nth-child(5) > .MuiGrid-root > span").click();
    await page.frameLocator('#mfe').locator("text=PHI VILLA 5 PCS PATIO DINING SET").waitFor();
    await page.frameLocator('#mfe').locator("div:nth-child(6) > .MuiGrid-root > .MuiFormControlLabel-root > .MuiButtonBase-root > .MuiIconButton-label > [type='checkbox']").click();
    
    
    await page.frameLocator('#mfe').locator("button:has-text('Done')").click();
    await page.frameLocator('#mfe').locator("button:has-text('Apply')").click();
   await page.frameLocator('#mfe').locator("text=PHI VILLA 5 PCS PATIO DINING SET >> nth=1").waitFor();
    var bool = await page.frameLocator('#mfe').locator("text=PHI VILLA 5 PCS PATIO DINING SET >> nth=1").isVisible();
    expect(bool).toBeTruthy();
})