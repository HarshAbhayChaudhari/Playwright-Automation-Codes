const {test,expect}= require('@playwright/test');
const logindata=JSON.parse(JSON.stringify(require('../../testdata/Logindata.json'))); //convert json file to string format and then create a object for converted file
const inputdata=JSON.parse(JSON.stringify(require('../../testdata/ID_Dashboard.json'))); //convert json file to string format and then create a object for converted file


test('Verify that user can able to type/enter any input in Location Hierarchy search bar on Cumulative KPI Impact tab',async ({browser})=>
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

    await frame.locator("input[type='text'] >> nth=0").click();
    await page.frameLocator('#mfe').locator("[data-testid='search-field']").type("vsvsvsv", {delay:100});
    await frame.locator("[data-testid='lui-ccl-empty-state-subtitle']").waitFor();
    var bool = await frame.locator("[data-testid='lui-ccl-empty-state-subtitle']").isVisible();
    expect(bool).toBeTruthy();

    
    //await page.pause();
   
});