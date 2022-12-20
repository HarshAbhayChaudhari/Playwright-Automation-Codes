const {test,expect}= require('@playwright/test');
const logindata=JSON.parse(JSON.stringify(require('../../../testdata/Logindata.json'))); //convert json file to string format and then create a object for converted file

test('Enter invalid search in location search bar',async ({browser})=>
{
    let webContext1;
    webContext1 = await browser.newContext({storageState:'LoginBypassCookies.json'});
    const page = await webContext1.newPage(); // new page will be launched with browser context defined
    await page.goto(logindata.presaleslink);

    await page.frameLocator('#mfe').locator("text ='Workbench'").click();
    //await page.pause();
    await expect(page.frameLocator('#mfe').locator("text='KPI Impact'")).toHaveText('KPI Impact');
    await page.frameLocator('#mfe').locator("[data-testid='location-SearchField'] [data-testid='search-field']").click(); //to click location search bar

    await page.frameLocator('#mfe').locator("[data-testid='hierarchy-selector'] [data-testid='search-field']").type("vsdys",{delay:100}); //and enter/type invalid data
    await page.frameLocator('#mfe').locator("[data-testid='lui-ccl-empty-state-subtitle']").waitFor();
    var bool = await page.frameLocator('#mfe').locator("[data-testid='lui-ccl-empty-state-subtitle']").isVisible();
    expect(bool).toBeTruthy();
    
    //await page.pause();
})