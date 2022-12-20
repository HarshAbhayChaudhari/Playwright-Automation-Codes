const {test,expect}= require('@playwright/test');
const logindata=JSON.parse(JSON.stringify(require('../../testdata/Logindata.json'))); //convert json file to string format and then create a object for converted file
const inputdata=JSON.parse(JSON.stringify(require('../../testdata/ID_Dashboard.json'))); //convert json file to string format and then create a object for converted file

test('Verify proper error message is displayed to user when invalid search is typed in Location hierarchy search',async ({browser})=>
{
    let webContext;
    webContext = await browser.newContext({storageState:'LoginBypassCookies.json'});
    const page = await webContext.newPage();
    await page.goto(logindata.presaleslink);
     
    await page.frameLocator('#mfe').locator(inputdata.KPIImpact).waitFor();
    await expect(page.frameLocator('#mfe').locator(inputdata.KPIImpact)).toHaveText('KPI Impact');

    //Clicking on the dropdown 
    await page.frameLocator('#mfe').locator(inputdata.LocationHierarchy_DD).click();

     //Typing invalid input in the search tab
     await page.frameLocator('#mfe').locator(inputdata.SearchTab).type("vsvsv",{delay:100});

     //Waiting for the no match text to appear
     await page.frameLocator('#mfe').locator("[data-testid='lui-ccl-empty-state-subtitle']").waitFor();
 
     //Checking if the No match text is visible or not
     var boolean = await page.frameLocator('#mfe').locator("[data-testid='lui-ccl-empty-state-subtitle']").isVisible();
     expect(boolean).toBeTruthy();
     
    //await page.pause();
});