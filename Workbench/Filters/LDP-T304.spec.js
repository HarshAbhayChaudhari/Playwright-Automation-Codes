const {test,expect}= require('@playwright/test');
const logindata=JSON.parse(JSON.stringify(require('../../../testdata/Logindata.json'))); //convert json file to string format and then create a object for converted file
const inputdata=JSON.parse(JSON.stringify(require('../../../testdata/ID_Dashboard.json'))); 
test('Location section filters',async ({browser})=>
{
    let webContext1;
    webContext1 = await browser.newContext({storageState:'LoginBypassCookies.json'});
    const page = await webContext1.newPage(); // new page will be launched with browser context defined
    await page.goto(logindata.presaleslink);

    await page.frameLocator('#mfe').locator("text ='Workbench'").click();
    await expect(page.frameLocator('#mfe').locator("text='KPI Impact'")).toHaveText('KPI Impact');
    //await page.pause();
    await page.frameLocator('#mfe').locator("[data-testid='location-SearchField'] [data-testid='search-field']").click();
    
    //Verifying that the search box is available or not
    var bool = await page.frameLocator('#mfe').locator("[data-testid='hierarchy-selector'] [data-testid='search-field']").isVisible();
    expect(bool).toBeTruthy();

    //Verifying the show all hyperlink
    await expect(page.frameLocator('#mfe').locator(inputdata.ShowAll)).toHaveText('Show All');

    //Verifying the Show Selected All hyperlink
    await expect(page.frameLocator('#mfe').locator(inputdata.ShowSelectedOnly)).toHaveText('Show Selected Only');
    
    //Verifying the Done button
    await expect(page.frameLocator('#mfe').locator(inputdata.Done)).toHaveText('Done');
    
    //Verifying the clear selection hyperlink
    await expect(page.frameLocator('#mfe').locator(inputdata.ClearSelection)).toHaveText('Clear Selection');

    //Verifying the close button at the top right corner
    var bool = await page.frameLocator('#mfe').locator("[aria-label='close'] >> nth=0").isVisible();
    expect(bool).toBeTruthy();
    
    //Verifying the close button besides the search tab
    var bool = await page.frameLocator('#mfe').locator("[data-testid='hierarchy-selector'] [aria-label='close']").isVisible();
    expect(bool).toBeTruthy();
    
    // await page.frameLocator('#mfe').locator("text=Filters >> nth=0").textContent();
    // await page.frameLocator('#mfe').locator("text=Locations").textContent();
    // await page.frameLocator('#mfe').locator("[data-testid='location-SearchField'] [data-testid='search-field']").textContent();
    // //await page.pause();
})