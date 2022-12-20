const {test,expect}= require('@playwright/test');
const logindata=JSON.parse(JSON.stringify(require('../../testdata/Logindata.json'))); //convert json file to string format and then create a object for converted file
let webContext;
const inputdata=JSON.parse(JSON.stringify(require('../../testdata/ID_Dashboard.json'))); //convert json file to string format and then create a object for converted file

test('Verify gear(settings) icon in KPI Impact grid',async ({browser})=>
{
    webContext = await browser.newContext({storageState:'LoginBypassCookies.json'});
    const page = await webContext.newPage();
    await page.goto(logindata.presaleslink);
     
    await page.frameLocator('#mfe').locator(inputdata.KPIImpact).waitFor();
    await expect(page.frameLocator('#mfe').locator(inputdata.KPIImpact)).toHaveText('KPI Impact');
    //await page.pause();
    await page.frameLocator('#mfe').locator(inputdata.Settings).click();
    //await page.pause();
    await page.frameLocator('#mfe').locator("text=Available KPIs (0) >> nth=0").waitFor();
    var bool = await page.frameLocator('#mfe').locator("text=Available KPIs (0) >> nth=0").isVisible();
    expect(bool).toBeTruthy();
    var bool = await page.frameLocator('#mfe').locator("text=In Use KPIs (4)").isVisible();
    expect(bool).toBeTruthy();

    let git = page.frameLocator('#mfe').locator(inputdata.Cancel);
    const box = await git.boundingBox();
    if(box){
        const y = box.y;
        await page.mouse.wheel(0, y);
    }

    var bool = await page.frameLocator('#mfe').locator(inputdata.Cancel).isVisible();
    expect(bool).toBeTruthy();
    var bool = await page.frameLocator('#mfe').locator(inputdata.SaveSettings).isVisible();
    expect(bool).toBeTruthy();

    //await page.pause();
});