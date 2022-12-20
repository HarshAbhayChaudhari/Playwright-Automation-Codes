const {test,expect}= require('@playwright/test');
const logindata=JSON.parse(JSON.stringify(require('../../testdata/Logindata.json'))); //convert json file to string format and then create a object for converted file
const inputdata=JSON.parse(JSON.stringify(require('../../testdata/ID_Dashboard.json'))); //convert json file to string format and then create a object for converted file

test('Verify the hierarchy tree expansion in Product Hierarchy Search on KPI Impact grid',async ({browser})=>
{
    let webContext;
    webContext = await browser.newContext({storageState:'LoginBypassCookies.json'});
    const page = await webContext.newPage();
    await page.goto(logindata.presaleslink);
     
    await page.frameLocator('#mfe').locator(inputdata.KPIImpact).waitFor();
    await expect(page.frameLocator('#mfe').locator(inputdata.KPIImpact)).toHaveText('KPI Impact');

    //await page.pause();
    await page.frameLocator('#mfe').locator(inputdata.ProductHierarchy_DD).click();
    await page.frameLocator('#mfe').locator("text=GARDEN & OUTDOORS").waitFor();
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
    await page.frameLocator('#mfe').locator("div:nth-child(5) > .MuiGrid-root > span").click();
    await page.frameLocator('#mfe').locator("div:nth-child(4) > .MuiGrid-root > span").click();
    await page.frameLocator('#mfe').locator("div:nth-child(3) > .MuiGrid-root > span").click();
    await page.frameLocator('#mfe').locator("div:nth-child(2) > .MuiGrid-root > span").click();
    
    //await page.pause();
});