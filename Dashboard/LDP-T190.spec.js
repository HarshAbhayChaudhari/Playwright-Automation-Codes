const {test,expect}= require('@playwright/test');
const logindata=JSON.parse(JSON.stringify(require('../../testdata/Logindata.json'))); //convert json file to string format and then create a object for converted file
const inputdata=JSON.parse(JSON.stringify(require('../../testdata/ID_Dashboard.json'))); //convert json file to string format and then create a object for converted file

test('Verify that user can able to type/enter any input in Product Hierarchy search bar on KPI Impact grid',async ({browser})=>
{
    let webContext;
    webContext = await browser.newContext({storageState:'LoginBypassCookies.json'});
    const page = await webContext.newPage();
    await page.goto(logindata.presaleslink);
     
    await page.frameLocator('#mfe').locator(inputdata.KPIImpact).waitFor();
    await expect(page.frameLocator('#mfe').locator("text='KPI Impact'")).toHaveText('KPI Impact');
    //await page.pause();
    await page.frameLocator('#mfe').locator(inputdata.ProductHierarchy_DD).click();
    await page.frameLocator('#mfe').locator("[data-testid='search-field']").type("fevvvsv", {delay:100});
    await page.frameLocator('#mfe').locator("[data-testid='lui-ccl-empty-state-subtitle']").waitFor();
 
     //Checking if the No match text is visible or not
     var boolean = await page.frameLocator('#mfe').locator("[data-testid='lui-ccl-empty-state-subtitle']").isVisible();
     expect(boolean).toBeTruthy();


    //await page.pause();

});