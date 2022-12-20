const {test,expect}= require('@playwright/test');
const logindata=JSON.parse(JSON.stringify(require('../../testdata/Logindata.json'))); //convert json file to string format and then create a object for converted file
let webContext;
const inputdata=JSON.parse(JSON.stringify(require('../../testdata/ID_Dashboard.json'))); //convert json file to string format and then create a object for converted file

test('Verify the default fields in KPI Impact grid',async ({browser})=>
{   
    webContext = await browser.newContext({storageState:'LoginBypassCookies.json'});
    const page = await webContext.newPage();
    await page.goto(logindata.presaleslink);
    
     
    await page.frameLocator('#mfe').locator(inputdata.KPIImpact).waitFor();
    await expect(page.frameLocator('#mfe').locator(inputdata.KPIImpact)).toHaveText('KPI Impact');

    var bool = await page.frameLocator('#mfe').locator(inputdata.LocationHierarchy).isVisible();
    expect(bool).toBeTruthy();
    var bool = await page.frameLocator('#mfe').locator(inputdata.ProductHierarchy).isVisible();
    expect(bool).toBeTruthy();
    var bool = await page.frameLocator('#mfe').locator("button >> nth=0").isVisible();
    expect(bool).toBeTruthy();
    var bool = await page.frameLocator('#mfe').locator("button >> nth=1").isVisible();
    expect(bool).toBeTruthy();
    var bool = await page.frameLocator('#mfe').locator("button >> nth=2").isVisible();
    expect(bool).toBeTruthy();
    var bool = await page.frameLocator('#mfe').locator("button >> nth=3").isVisible();
    expect(bool).toBeTruthy();
    var bool = await page.frameLocator('#mfe').locator("button >> nth=4").isVisible();
    expect(bool).toBeTruthy();
   
    var bool = await page.frameLocator('#mfe').locator(".css-babf46 > .MuiFormControl-root > .MuiInputBase-root > .MuiInputAdornment-root > .MuiSvgIcon-root > path >> nth=0").isVisible();
    expect(bool).toBeTruthy();
    var bool = await page.frameLocator('#mfe').locator('.css-babf46 > .MuiFormControl-root > .MuiInputBase-root > .MuiInputAdornment-root > .MuiSvgIcon-root > path >> nth=1').isVisible();
    expect(bool).toBeTruthy();
   

    //await page.pause();
});