const {test,expect}= require('@playwright/test');
const logindata=JSON.parse(JSON.stringify(require('../../../testdata/Logindata.json'))); //convert json file to string format and then create a object for converted file

test('Product attribute dropdown',async ({browser})=>
{
    let webContext1;
    webContext1 = await browser.newContext({storageState:'LoginBypassCookies.json'});
    const page = await webContext1.newPage(); // new page will be launched with browser context defined
    await page.goto(logindata.presaleslink);

    await page.frameLocator('#mfe').locator("text ='Workbench'").click();
    await expect(page.frameLocator('#mfe').locator("text='KPI Impact'")).toHaveText('KPI Impact');
    //await page.pause();
    await page.frameLocator('#mfe').locator("[data-testid='lui-ccl-card-header-iconbutton'] >> span[class='MuiIconButton-label'] >> svg[focusable='false'] >> nth=1").click();
    //Select any filter from availbale dropdowns and then clickon apply
    await page.frameLocator('#mfe').locator("button:has-text('Apply')").click();

})