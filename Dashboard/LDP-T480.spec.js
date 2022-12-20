const {test,expect}= require('@playwright/test');
const logindata=JSON.parse(JSON.stringify(require('../../testdata/Logindata.json'))); //convert json file to string format and then create a object for converted file
const inputdata=JSON.parse(JSON.stringify(require('../../testdata/ID_Dashboard.json'))); //convert json file to string format and then create a object for converted file


test('Verify the default fields in Cumulative KPI Impact grid',async ({browser})=>
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
    await frame.locator("button >> nth=4").click();
    var bool = frame.locator("text=Average Paid Price ($)").isVisible();
    expect(bool).toBeTruthy();
    await frame.locator("button >> nth=3").click();
    await frame.locator("text=Stocks (PCS)").waitFor();
    var bool = frame.locator("text=Stocks (PCS)").isVisible();
    expect(bool).toBeTruthy();
    
    //await page.pause();
   
});