const {test,expect}= require('@playwright/test');
const logindata=JSON.parse(JSON.stringify(require('../../../testdata/Logindata.json'))); //convert json file to string format and then create a object for converted file
const inputdata=JSON.parse(JSON.stringify(require('../../../testdata/ID_Workbench.json')));

test('KPI Plus Minus Action',async ({browser})=>
{
    let webContext1;
    webContext1 = await browser.newContext({storageState:'LoginBypassCookies.json'});
    const page = await webContext1.newPage(); // new page will be launched with browser context defined
    await page.goto(logindata.presaleslink);

    await page.frameLocator('#mfe').locator("text ='Workbench'").click(); // click workbench page
    await expect(page.frameLocator('#mfe').locator("text='KPI Impact'")).toHaveText('KPI Impact');

    await page.frameLocator('#mfe').locator(inputdata.SettingsK).click();

    await page.frameLocator('#mfe').locator(".card-item > .MuiButtonBase-root >> nth=0").click(); //(-) move price to available section and after save setting it will not shown in KPI impact
    await page.frameLocator('#mfe').locator(inputdata.SaveSettings).click(); // after save setting it will not shown in KPI impact 

    
})