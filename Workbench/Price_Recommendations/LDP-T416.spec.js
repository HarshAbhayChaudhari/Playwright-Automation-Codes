const {test,expect}= require('@playwright/test');
const logindata=JSON.parse(JSON.stringify(require('../../../testdata/Logindata.json'))); //convert json file to string format and then create a object for converted file

test('Verify the functionality of Flat view with location filter applied in Price Recommendations grid',async ({browser})=>
{
    let webContext1;
    webContext1 = await browser.newContext({storageState:'LoginBypassCookies.json'});
    const page = await webContext1.newPage(); // new page will be launched with browser context defined
    await page.goto(logindata.presaleslink);
    const frame = page.frameLocator('#mfe');
    await page.frameLocator('#mfe').locator("text ='Workbench'").click();
    var location = frame.locator("[aria-label='button L_COUNTRY']").isEnabled();
    expect(location).toBeTruthy();
    await frame.locator("[aria-label='button L_COUNTRY']").click();
    await frame.locator("[data-testid='location-SearchField'] [data-testid='search-field']").waitFor();
    await frame.locator("[data-testid='location-SearchField'] [data-testid='search-field']").click();
    var done = frame.locator("button:has-text('Done')").isEnabled();
    expect(done).toBeTruthy();
    await frame.locator("button:has-text('Done')").click();
    var apply = frame.locator("button:has-text('Apply')").isEnabled();
    expect(apply).toBeTruthy();
    await frame.locator("button:has-text('Apply')").click();
    var bool = frame.locator("[data-testid='flat-view-btn']").isVisible();
    expect(bool).toBeTruthy();
    await frame.locator("[data-testid='flat-view-btn']").click();
    //await page.pause();
    //API pending
})