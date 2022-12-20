const {test,expect}= require('@playwright/test');
const logindata=JSON.parse(JSON.stringify(require('../../testdata/Logindata.json'))); //convert json file to string format and then create a object for converted file
const inputdata=JSON.parse(JSON.stringify(require('../../testdata/ID_Dashboard.json'))); //convert json file to string format and then create a object for converted file

test('Verify the labels displayed in Recommendations grid',async ({browser})=>
{
    let webContext;
    webContext = await browser.newContext({storageState:'LoginBypassCookies.json'});
    const page = await webContext.newPage();
    await page.goto(logindata.presaleslink);
     
    await page.frameLocator('#mfe').locator("text='KPI Impact'").waitFor();
    await expect(page.frameLocator('#mfe').locator("text='KPI Impact'")).toHaveText('KPI Impact');
    //await page.pause();
    await page.frameLocator('#mfe').locator(".css-babf46 > .MuiFormControl-root > .MuiInputBase-root > .MuiInputAdornment-root > .MuiSvgIcon-root > path >> nth=1").click();
   
    await page.frameLocator('#mfe').locator(inputdata.DefaultEndDate).click();
    await page.frameLocator('#mfe').locator("text=Jul").click();
    var bool = await page.frameLocator('#mfe').locator("input[value='Aggregate Until End of Jul 20']").isVisible();
    expect(bool).toBeTruthy();

    await page.frameLocator('#mfe').locator(".css-babf46 > .MuiFormControl-root > .MuiInputBase-root > .MuiInputAdornment-root > .MuiSvgIcon-root > path >> nth=0").click();
    await page.frameLocator('#mfe').locator(inputdata.DefaultStartDate).click();
    await page.frameLocator('#mfe').locator("text=Aug").click();
    //await page.pause();
    var bool = await page.frameLocator('#mfe').locator("span[class='message-style'] >> text='Aggregation date is reset due to dependent field changes'").isVisible();
    expect(bool).toBeTruthy();
    //await page.pause();
});