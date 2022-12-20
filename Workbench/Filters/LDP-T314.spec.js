const {test,expect}= require('@playwright/test');
const logindata=JSON.parse(JSON.stringify(require('../../../testdata/Logindata.json'))); //convert json file to string format and then create a object for converted file

test('Max min action',async ({browser})=>
{
    let webContext1;
    webContext1 = await browser.newContext({storageState:'LoginBypassCookies.json'});
    const page = await webContext1.newPage(); // new page will be launched with browser context defined
    await page.goto(logindata.presaleslink);

    await page.frameLocator('#mfe').locator("text ='Workbench'").click();
    await page.frameLocator('#mfe').locator("text='KPI Impact'").waitFor();
    await expect(page.frameLocator('#mfe').locator("text='KPI Impact'")).toHaveText('KPI Impact');
    await page.pause();
    await page.frameLocator('#mfe').locator("text=FiltersReset >> [data-testid='lui-ccl-card-header-iconbutton']").click(); //to click for minimize Action
    await page.frameLocator('#mfe').locator(".MuiBox-root > .MuiSvgIcon-root > svg > path").click(); //to click for maxmize action 
    //await page.pause();
})