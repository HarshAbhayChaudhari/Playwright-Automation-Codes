const {test,expect}= require('@playwright/test');
const logindata=JSON.parse(JSON.stringify(require('../../testdata/Logindata.json'))); //convert json file to string format and then create a object for converted file
const inputdata=JSON.parse(JSON.stringify(require('../../testdata/ID_Dashboard.json'))); //convert json file to string format and then create a object for converted file


test('Verify the Clear Selection hyperlink action in Location hierarchy search on Cumulative KPI Impact tab',async ({browser})=>
{   
    let webContext;
    webContext = await browser.newContext({storageState:'LoginBypassCookies.json'});
    const page = await webContext.newPage();
    await page.goto(logindata.presaleslink);
    const frame = page.frameLocator('#mfe');
    await frame.locator("text='KPI Impact'").waitFor();
    await expect(frame.locator("text='KPI Impact'")).toHaveText('KPI Impact');
    
    await frame.locator("text=Cumulative KPI Impact").click();
    await frame.locator("text=Stocks (PCS)").waitFor();

    //await page.pause();

    await frame.locator("input[type='text'] >> nth=0").click();
    await frame.locator("[data-testid='expand-icon'] >> nth=1").click();
    await frame.locator("div:nth-child(3) > .MuiGrid-root > span").click();
    await frame.locator("text=Denver").waitFor();
    await frame.locator("div:nth-child(4) > .MuiGrid-root > .MuiFormControlLabel-root > .MuiButtonBase-root > .MuiIconButton-label > [type='radio']").click();

    await frame.locator(".MuiGrid-root > span >> nth=0").click();
    var bool = await frame.locator("text=Clear Selection").isVisible();
    expect(bool).toBeTruthy();

    await frame.locator("text=Clear Selection").click();
    await frame.locator("button:has-text('Done')").click();

    var bool = await frame.locator("input[value='All']").isVisible();
    expect(bool).toBeTruthy();
    
    //await page.pause();
   
});