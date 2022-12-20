const {test,expect}= require('@playwright/test');
const logindata=JSON.parse(JSON.stringify(require('../../testdata/Logindata.json'))); //convert json file to string format and then create a object for converted file
const inputdata=JSON.parse(JSON.stringify(require('../../testdata/ID_Dashboard.json'))); //convert json file to string format and then create a object for converted file

test('Verify the defaults fields in Product Hierarchy search on KPI Impact grid',async ({browser})=>
{
    let webContext;
    webContext = await browser.newContext({storageState:'LoginBypassCookies.json'});
    const page = await webContext.newPage();
    await page.goto(logindata.presaleslink);
     
    await page.frameLocator('#mfe').locator(inputdata.KPIImpact).waitFor();
    await expect(page.frameLocator('#mfe').locator(inputdata.KPIImpact)).toHaveText('KPI Impact');

     //Clicking on the dropdown 
     await page.frameLocator('#mfe').locator(inputdata.LocationHierarchy_DD).click();

     //Verifying the Show All hyperlink
     await expect(page.frameLocator('#mfe').locator(inputdata.ShowAll)).toHaveText('Show All');
 
     //Verifying the show selected all hyperlink
     await expect(page.frameLocator('#mfe').locator(inputdata.ShowSelectedOnly)).toHaveText('Show Selected Only');
 
     //Verifying the done button
     await expect(page.frameLocator('#mfe').locator(inputdata.Done)).toHaveText('Done');
 
     //Verifying the clear selection hyperlink
     await expect(page.frameLocator('#mfe').locator(inputdata.ClearSelection)).toHaveText('Clear Selection');
     
     //Verifying the search tab
     var bool = await page.frameLocator('#mfe').locator(inputdata.SearchTab).isVisible();
     expect(bool).toBeTruthy();
     
     //Verifying the close button at the top right corner
     var bool = await page.frameLocator('#mfe').locator(inputdata.CloseBig).isVisible();
     expect(bool).toBeTruthy();
     
     //Verifying the close button besides the search tab
     var bool = await page.frameLocator('#mfe').locator(inputdata.CloseSmall).isVisible();
     expect(bool).toBeTruthy();
     
    //await page.pause();
});