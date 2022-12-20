const {test,expect}= require('@playwright/test');
const logindata=JSON.parse(JSON.stringify(require('../../../testdata/Logindata.json'))); //convert json file to string format and then create a object for converted file

test('Aggregation level section',async ({browser})=>
{
    let webContext1;
    webContext1 = await browser.newContext({storageState:'LoginBypassCookies.json'});
    const page = await webContext1.newPage(); // new page will be launched with browser context defined
    await page.goto(logindata.presaleslink);

    await page.frameLocator('#mfe').locator("text ='Workbench'").click(); //click workbench page
    await expect(page.frameLocator('#mfe').locator("text='KPI Impact'")).toHaveText('KPI Impact');
    //await page.pause();
    var bool = await page.frameLocator('#mfe').locator("text=Aggregation Level").isVisible(); 
    expect(bool).toBeTruthy();//identify aggregation level
    await page.frameLocator('#mfe').locator("[aria-label='button All']").waitFor();
    var bool = await page.frameLocator('#mfe').locator("[aria-label='button All']").isVisible();
    expect(bool).toBeTruthy();
    var bool = await page.frameLocator('#mfe').locator("[aria-label='button L_COUNTRY']").isVisible();
    expect(bool).toBeTruthy(); //identify L-Country button in Aggregayion level
    var bool = await page.frameLocator('#mfe').locator("[aria-label='button PRICE_ZONE']").isVisible();
    expect(bool).toBeTruthy(); //identify Price-Zone button in Aggregayion level
    var bool = await page.frameLocator('#mfe').locator("[aria-label='button Location']").isVisible();
    expect(bool).toBeTruthy(); //identify Location button in Aggregayion level
})