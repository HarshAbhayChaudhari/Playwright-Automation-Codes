const {test,expect}= require('@playwright/test');
const logindata=JSON.parse(JSON.stringify(require('../../testdata/Logindata.json'))); //convert json file to string format and then create a object for converted file
const inputdata=JSON.parse(JSON.stringify(require('../../testdata/ID_Dashboard.json'))); //convert json file to string format and then create a object for converted file

test('Verify the Clear Selection hyperlink action in Product hierarchy search on KPI Impact grid',async ({browser})=>
{
    let webContext;
    webContext = await browser.newContext({storageState:'LoginBypassCookies.json'});
    const page = await webContext.newPage();
    await page.goto(logindata.presaleslink);
     
    await page.frameLocator('#mfe').locator(inputdata.KPIImpact).waitFor();
    await expect(page.frameLocator('#mfe').locator(inputdata.KPIImpact)).toHaveText('KPI Impact');

    //await page.pause();
    await page.frameLocator('#mfe').locator(inputdata.ProductHierarchy_DD).click();
    await page.frameLocator('#mfe').locator("div:nth-child(2) > .MuiGrid-root > .MuiFormControlLabel-root > .MuiButtonBase-root > .MuiIconButton-label > [type='radio']").click();
    await page.frameLocator('#mfe').locator(inputdata.ClearSelection).click();
    await page.frameLocator('#mfe').locator(inputdata.Done).click();
    var bool = await page.frameLocator('#mfe').locator("input[value='All']").isVisible();
    expect(bool).toBeTruthy();

    //page.evaluate("document.body.style.zoom=0.5")

    
    //await page.pause();

});