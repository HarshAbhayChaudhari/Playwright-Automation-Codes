const {test,expect}= require('@playwright/test');
const logindata=JSON.parse(JSON.stringify(require('../../../testdata/Logindata.json'))); //convert json file to string format and then create a object for converted file

test('Product search bar close icon',async ({browser})=>
{
    let webContext1;
    webContext1 = await browser.newContext({storageState:'LoginBypassCookies.json'});
    const page = await webContext1.newPage(); // new page will be launched with browser context defined
    await page.goto(logindata.presaleslink);

    await page.frameLocator('#mfe').locator("text ='Workbench'").click();
    await expect(page.frameLocator('#mfe').locator("text='KPI Impact'")).toHaveText('KPI Impact');
    //await page.pause();
    await page.frameLocator('#mfe').locator("[data-testid='product-SearchField'] [data-testid='search-field']").click();
    await page.frameLocator('#mfe').locator("[data-testid='hierarchy-selector'] [data-testid='search-field']").type("ghfsd",{delay:100});
    await page.frameLocator('#mfe').locator("[aria-label='close'] >> nth=0").click();
    var bool = await page.frameLocator('#mfe').locator("input[value=''] >> nth=1").isVisible();
    expect(bool).toBeTruthy();
})