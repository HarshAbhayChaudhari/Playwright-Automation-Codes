const {test,expect}= require('@playwright/test');
const logindata=JSON.parse(JSON.stringify(require('../../../testdata/Logindata.json'))); //convert json file to string format and then create a object for converted file

test('Contraction Product section',async ({browser})=>
{
    let webContext1;
    webContext1 = await browser.newContext({storageState:'LoginBypassCookies.json'});
    const page = await webContext1.newPage(); // new page will be launched with browser context defined
    await page.goto(logindata.presaleslink);

    await page.frameLocator('#mfe').locator("text ='Workbench'").click();
    await expect(page.frameLocator('#mfe').locator("text='KPI Impact'")).toHaveText('KPI Impact');
    //await page.pause();
    await page.frameLocator('#mfe').locator("[data-testid='product-SearchField'] [data-testid='search-field']").click();
    await page.frameLocator('#mfe').locator("[data-testid='hierarchy-selector'] input[type='checkbox'] >> nth=0").click();
    await page.frameLocator('#mfe').locator("text=GARDEN & OUTDOORS ").waitFor();
    await page.frameLocator('#mfe').locator("div:nth-child(2) > .MuiGrid-root > span").click();
    await page.frameLocator('#mfe').locator("text=PATIO").waitFor();
    await page.frameLocator('#mfe').locator("div:nth-child(3) > .MuiGrid-root > span").click();
    await page.frameLocator('#mfe').locator("text=FURNITURE").waitFor();
    await page.frameLocator('#mfe').locator("div:nth-child(4) > .MuiGrid-root > span").click();
    await page.frameLocator('#mfe').locator("text=TABLES & CHAIRS").waitFor();
    await page.frameLocator('#mfe').locator("div:nth-child(5) > .MuiGrid-root > span").click();
    await page.frameLocator('#mfe').locator("text=PHI VILLA 5 PCS PATIO DINING SET").waitFor();
    var bool = await page.frameLocator('#mfe').locator("text=PHI VILLA 5 PCS PATIO DINING SET").isVisible();
    expect(bool).toBeTruthy();
   

})