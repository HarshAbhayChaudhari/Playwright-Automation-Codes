const {test,expect}= require('@playwright/test');
const logindata=JSON.parse(JSON.stringify(require('../../../testdata/Logindata.json'))); //convert json file to string format and then create a object for converted file

test('Clear Selection Location Section',async ({browser})=>
{
    let webContext1;
    webContext1 = await browser.newContext({storageState:'LoginBypassCookies.json'});
    const page = await webContext1.newPage(); // new page will be launched with browser context defined
    await page.goto(logindata.presaleslink);

    await page.frameLocator('#mfe').locator("text ='Workbench'").click(); //click workbench page
    await expect(page.frameLocator('#mfe').locator("text='KPI Impact'")).toHaveText('KPI Impact');
    //await page.pause();
    
    await page.frameLocator('#mfe').locator("[aria-label='button Location']").click();
    await page.frameLocator('#mfe').locator("[data-testid='location-SearchField'] [data-testid='search-field']").click();
    await page.frameLocator('#mfe').locator("[data-testid='hierarchy-selector'] input[type='checkbox'] >> nth=0").click();
    await page.frameLocator('#mfe').locator("[data-testid='expand-icon'] >> nth=1").click();
    
    await page.frameLocator('#mfe').locator("text=North Region").waitFor();
    await page.frameLocator('#mfe').locator("div:nth-child(3) > .MuiGrid-root > span").click();
    await page.frameLocator('#mfe').locator("text=Denver").waitFor();
    await page.frameLocator('#mfe').locator("div:nth-child(4) > .MuiGrid-root > .MuiFormControlLabel-root > .MuiButtonBase-root > .MuiIconButton-label > [type='checkbox']").click();
   
   await page.frameLocator('#mfe').locator("text=Clear Selection").click();
   await page.frameLocator('#mfe').locator("button:has-text('Done')").click();
   var bool = await page.frameLocator('#mfe').locator("input[value=''] >> nth=1").isVisible();
   expect(bool).toBeTruthy();
   //await page.pause();
})