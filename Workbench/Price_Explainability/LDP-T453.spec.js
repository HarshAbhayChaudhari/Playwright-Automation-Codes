const {test,expect}= require('@playwright/test');
const logindata=JSON.parse(JSON.stringify(require('../../../testdata/Logindata.json'))); //convert json file to string format and then create a object for converted file

test('Verify if Summary section in the Modal in collapsible..',async ({browser})=>
{
    let webContext1;
    webContext1 = await browser.newContext({storageState:'LoginBypassCookies.json'});
    const page = await webContext1.newPage(); // new page will be launched with browser context defined
    await page.goto(logindata.presaleslink);
    const frame = page.frameLocator('#mfe');
    await frame.locator("text ='Workbench'").click();
    //await page.pause();
    var location = await frame.locator("[aria-label='button Location']").isEnabled();
    expect(location).toBeTruthy();
    await frame.locator("[aria-label='button Location']").click();
    await page.waitForTimeout(2000);
    await page.pause();
    let gitt = frame.locator("text=Additional Filters");
    const boxx =await gitt.boundingBox();
    if(boxx){
        const y = boxx.y;
        await page.mouse.wheel(0, y);
    }
    var apply = await frame.locator("button:has-text('Apply')").isEnabled();
    expect(apply).toBeTruthy();
    await frame.locator("button:has-text('Apply')").click();

    var bool = frame.locator("[data-testid='flat-view-btn']").isVisible();
    expect(bool).toBeTruthy();
    await frame.locator("[data-testid='flat-view-btn']").click();

    var bool = frame.locator("text=Location Hierarchy").isVisible();
    expect(bool).toBeTruthy();
    var bool = frame.locator("td[role='cell']:has-text('Dallas') >> nth=0").isVisible();
    expect(bool).toBeTruthy();
    //await page.pause();
})
