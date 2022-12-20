const {test,expect}= require('@playwright/test');
const logindata=JSON.parse(JSON.stringify(require('../../../testdata/Logindata.json'))); //convert json file to string format and then create a object for converted file

test('Verify the Flat view icon in Price Recommendations grid',async ({browser})=>
{
    let webContext1;
    webContext1 = await browser.newContext({storageState:'LoginBypassCookies.json'});
    const page = await webContext1.newPage(); // new page will be launched with browser context defined
    await page.goto(logindata.presaleslink);
    const frame = page.frameLocator('#mfe');
    await page.frameLocator('#mfe').locator("text ='Workbench'").click();
    //await page.pause();
   var bool = frame.locator("[data-testid='flat-view-btn']").isVisible();
    expect(bool).toBeTruthy();
    await frame.locator("[data-testid='flat-view-btn']").textContent();
    await page.waitForTimeout(3000);
    
})