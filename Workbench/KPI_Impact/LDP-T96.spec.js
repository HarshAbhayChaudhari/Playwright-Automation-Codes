const {test,expect}= require('@playwright/test');
const logindata=JSON.parse(JSON.stringify(require('../../../testdata/Logindata.json'))); //convert json file to string format and then create a object for converted file
const inputdata=JSON.parse(JSON.stringify(require('../../../testdata/ID_Workbench.json')));

test('KPI Add All Action',async ({browser})=>
{
    let webContext1;
    webContext1 = await browser.newContext({storageState:'LoginBypassCookies.json'});
    const page = await webContext1.newPage(); // new page will be launched with browser context defined
    await page.goto(logindata.presaleslink);

    await page.frameLocator('#mfe').locator("text ='Workbench'").click(); // click workbench page
    await page.frameLocator('#mfe').locator("text='KPI Impact'").waitFor();
    await expect(page.frameLocator('#mfe').locator("text='KPI Impact'")).toHaveText('KPI Impact');

   //await page.pause();
    
    await page.frameLocator('#mfe').locator(inputdata.SettingsK).click(); //click gear icon
    //await page.frameLocator('#mfe').locator("div:nth-child(2) > .card-item > .MuiButtonBase-root").click();
    await page.frameLocator('#mfe').locator(inputdata.ClearAll).click(); //clear all KPIs or move to available section
    await page.frameLocator('#mfe').locator("div:nth-child(2) > .column-card").textContent(); 
    await expect(page.frameLocator('#mfe').locator("[data-testid='lui-ccl-empty-state-heading']")).toHaveText("No KPIs to Show"); //No KPIs to show in view section

    await page.frameLocator('#mfe').locator("text='Add All'").click(); //Add all to in view section
    await page.frameLocator('#mfe').locator(".column-card >> nth=0").textContent();
    await expect(page.frameLocator('#mfe').locator("[data-testid='lui-ccl-empty-state-heading']")).toHaveText("No KPIs to Show");
    await page.frameLocator('#mfe').locator(inputdata.Close).click();
    let git = page.frameLocator('#mfe').locator(inputdata.AddFilters_DD);
    const box = await git.boundingBox();
    if(box){
        const y = box.y;
        await page.mouse.wheel(0, y);
    }
    await git.click();
    //await page.pause();
    //await page.frameLocator('#mfe').locator("text=PriceStocksCumulative N SalesCumulative ProfitCumulative Revenue >> button >> nth=0").click(); //click Price(+) (add to available)
});