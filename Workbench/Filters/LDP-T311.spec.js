const {test,expect}= require('@playwright/test');
const logindata=JSON.parse(JSON.stringify(require('../../../testdata/Logindata.json'))); //convert json file to string format and then create a object for converted file

test('Aggregation section level Country ',async ({browser})=>
{
    let webContext1;
    webContext1 = await browser.newContext({storageState:'LoginBypassCookies.json'});
    const page = await webContext1.newPage(); // new page will be launched with browser context defined
    await page.goto(logindata.presaleslink);

    await page.frameLocator('#mfe').locator("text ='Workbench'").click();
    await expect(page.frameLocator('#mfe').locator("text='KPI Impact'")).toHaveText('KPI Impact');
    await page.pause();
    await page.frameLocator('#mfe').locator("[aria-label='button L_COUNTRY']").click(); //to select country from filter (aggregate stage level)
    await page.frameLocator('#mfe').locator("[data-testid='location-SearchField'] [data-testid='search-field']").click();
    await page.frameLocator('#mfe').locator("[data-testid='hierarchy-selector'] input[type='checkbox'] >> nth=0").click();
    await page.frameLocator('#mfe').locator("[data-testid='expand-icon'] >> nth=1").click();
    
    await page.frameLocator('#mfe').locator("text=North Region").waitFor();
    var bool = await page.frameLocator('#mfe').locator("div:nth-child(3) > .MuiGrid-root > .MuiFormControlLabel-root > .MuiButtonBase-root > .MuiIconButton-label > [type='checkbox']").isDisabled();
    expect(bool).toBeTruthy();
    //await page.pause();
})