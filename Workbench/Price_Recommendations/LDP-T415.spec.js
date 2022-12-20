const {test,expect}= require('@playwright/test');
const logindata=JSON.parse(JSON.stringify(require('../../../testdata/Logindata.json'))); //convert json file to string format and then create a object for converted file

test('Verify the functionality of Flat view in Price Recommendations grid',async ({browser})=>
{
    let webContext1;
    webContext1 = await browser.newContext({storageState:'LoginBypassCookies.json'});
    const page = await webContext1.newPage(); // new page will be launched with browser context defined
    await page.goto(logindata.presaleslink);
    const frame = page.frameLocator('#mfe');
    await frame.locator("text ='Workbench'").click();
    var bool = frame.locator("[data-testid='flat-view-btn']").isEnabled();
    expect(bool).toBeTruthy();
    await frame.locator("[data-testid='flat-view-btn']").click();
    //await page.pause();
    //API pending
})