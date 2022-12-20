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
    await frame.locator("input[type='text'] >> nth=0").click();
    await frame.locator("[data-testid='expand-icon'] >> nth=1").click();
    await frame.locator("div:nth-child(3) > .MuiGrid-root > span").click();
    await frame.locator("text=Denver").waitFor();
    
    await frame.locator("div:nth-child(7) > .MuiGrid-root > span").click();
    await frame.locator("text=Dallas").waitFor();
    await frame.locator("div:nth-child(3) > .MuiGrid-root > span").click();
    await frame.locator("div:nth-child(4) > .MuiGrid-root > span").click();
    await frame.locator("div:nth-child(5) > .MuiGrid-root > span").click();
    await frame.locator("text =San Francisco").waitFor();
    await frame.locator("div:nth-child(5) > .MuiGrid-root > span").click();
    await frame.locator("div:nth-child(6) > .MuiGrid-root > span").click();
    await frame.locator("text =New York").waitFor();
    //await page.pause();
   
});