const {test,expect}= require('@playwright/test');
const logindata=JSON.parse(JSON.stringify(require('../../../testdata/Logindata.json'))); //convert json file to string format and then create a object for converted file

test('Select and execute search bar in location section',async ({browser})=>
{
    let webContext1;
    webContext1 = await browser.newContext({storageState:'LoginBypassCookies.json'});
    const page = await webContext1.newPage(); // new page will be launched with browser context defined
    await page.goto(logindata.presaleslink);

    await page.frameLocator('#mfe').locator("text ='Workbench'").click();
    //await page.pause();
    await page.frameLocator('#mfe').locator("text='KPI Impact'").waitFor();
    await expect(page.frameLocator('#mfe').locator("text='KPI Impact'")).toHaveText('KPI Impact');
    await page.frameLocator('#mfe').locator("[aria-label='button L_COUNTRY']").click(); //to select country on aggregate level
    await page.frameLocator('#mfe').locator("[data-testid='location-SearchField'] [data-testid='search-field']").click(); //click on search bar of location
    await page.frameLocator('#mfe').locator("button:has-text('Done')").click();
    await page.frameLocator('#mfe').locator("button:has-text('Apply')").click();
})