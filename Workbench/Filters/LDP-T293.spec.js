const {test,expect}= require('@playwright/test');
const logindata=JSON.parse(JSON.stringify(require('../../../testdata/Logindata.json'))); //convert json file to string format and then create a object for converted file

test('Enter in Product search bar',async ({browser})=>
{
    let webContext1;
    webContext1 = await browser.newContext({storageState:'LoginBypassCookies.json'});
    const page = await webContext1.newPage(); // new page will be launched with browser context defined
    await page.goto(logindata.presaleslink);

    await page.frameLocator('#mfe').locator("text ='Workbench'").click();
    await expect(page.frameLocator('#mfe').locator("text='KPI Impact'")).toHaveText('KPI Impact');
    //await page.pause();
    await page.frameLocator('#mfe').locator("[data-testid='product-SearchField'] [data-testid='search-field']").click(); //to click product search bar
    
    await page.frameLocator('#mfe').locator("[data-testid='hierarchy-selector'] [data-testid='search-field']").type("ghfsd",{delay:100}); //to enter invalid search
    await page.frameLocator('#mfe').locator("[data-testid='lui-ccl-empty-state-subtitle']").waitFor();
    var bool = await page.frameLocator('#mfe').locator("[data-testid='lui-ccl-empty-state-subtitle']").isVisible();
    expect(bool).toBeTruthy();
    //await page.pause();
})