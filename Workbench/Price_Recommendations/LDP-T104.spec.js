const {test,expect}= require('@playwright/test');
const logindata=JSON.parse(JSON.stringify(require('../../../testdata/Logindata.json'))); //convert json file to string format and then create a object for converted file
const inputdata=JSON.parse(JSON.stringify(require('../../../testdata/ID_Workbench.json')));

test('PR Cancel Action',async ({browser})=>
{
    let webContext1;
    webContext1 = await browser.newContext({storageState:'LoginBypassCookies.json'});
    const page = await webContext1.newPage(); // new page will be launched with browser context defined
    await page.goto(logindata.presaleslink);

    await page.frameLocator('#mfe').locator("text ='Workbench'").click();
    await expect(page.frameLocator('#mfe').locator("text='KPI Impact'")).toHaveText('KPI Impact');

    //await page.pause();
    await page.frameLocator('#mfe').locator(inputdata.SettingsP).click();
    await page.frameLocator('#mfe').locator(inputdata.ClearAll).click();
    await page.frameLocator('#mfe').locator("div:nth-child(2) > .column-card").textContent();
    await page.frameLocator('#mfe').locator("[data-testid='lui-ccl-empty-state-heading']").textContent();
    //await page.pause();
    await page.frameLocator('#mfe').locator(inputdata.Cancel).click();
    //await page.pause();
})