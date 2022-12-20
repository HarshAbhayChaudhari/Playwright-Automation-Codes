const {test,expect}= require('@playwright/test');
const logindata=JSON.parse(JSON.stringify(require('../../../testdata/Logindata.json'))); //convert json file to string format and then create a object for converted file

test('Enter in location search bar and close',async ({browser})=>
{
    let webContext1;
    webContext1 = await browser.newContext({storageState:'LoginBypassCookies.json'});
    const page = await webContext1.newPage(); // new page will be launched with browser context defined
    await page.goto(logindata.presaleslink);
    await page.frameLocator('#mfe').locator("text ='Workbench'").click();
    await expect(page.frameLocator('#mfe').locator("text='KPI Impact'")).toHaveText('KPI Impact');
    //await page.pause();
    await page.frameLocator('#mfe').locator("[data-testid='location-SearchField'] [data-testid='search-field']").click(); //to click search bar
    
    await page.frameLocator('#mfe').locator("[data-testid='hierarchy-selector'] [data-testid='search-field']").type("fsfvsev",{delay:100}); //enter invalid search
    
    await page.frameLocator('#mfe').locator("[data-testid='hierarchy-selector'] [aria-label='close']").click(); //to click on close icon of Search bar
    var bool = await page.frameLocator('#mfe').locator("input[value=''] >> nth=1").isVisible();
    expect(bool).toBeTruthy();
    //await page.pause();
})