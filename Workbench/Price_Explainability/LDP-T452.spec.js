const {test,expect}= require('@playwright/test');
const logindata=JSON.parse(JSON.stringify(require('../../../testdata/Logindata.json'))); //convert json file to string format and then create a object for converted file

test('Verify that Price explainability modal is shown only at lowest level of all aggregation levels.',async ({browser})=>
{
    let webContext1;
    webContext1 = await browser.newContext({storageState:'LoginBypassCookies.json'});
    const page = await webContext1.newPage(); // new page will be launched with browser context defined
    await page.goto(logindata.presaleslink);
    const frame = page.frameLocator('#mfe');
    await frame.locator("text ='Workbench'").click();

    var location = await frame.locator("[aria-label='button Location']").isEnabled();
    expect(location).toBeTruthy();
    await frame.locator("[aria-label='button Location']").click();
    await page.waitForTimeout(2000);
    
    let gitt = frame.locator("text=Additional Filters");
    const boxx =await gitt.boundingBox();
    if(boxx){
        const y = boxx.y;
        await page.mouse.wheel(0, y);
    }
    var apply = await frame.locator("button:has-text('Apply')").isEnabled();
    expect(apply).toBeTruthy();
    await frame.locator("button:has-text('Apply')").click();
    let git = page.frameLocator('#mfe').locator("[data-testid='chevron-icon-wrapper']");
    const box =await git.boundingBox();
    if(box){
        const y = box.y;
        await page.mouse.wheel(0, y);
    }
    await page.frameLocator('#mfe').locator("[data-testid='chevron-icon-wrapper'] >> nth=0").click();
   
    await page.frameLocator('#mfe').locator("[data-testid='chevron-icon-wrapper'] >> nth=1").click();
    await page.frameLocator('#mfe').locator("span:has-text('PATIO')").waitFor();
    await page.frameLocator('#mfe').locator("[data-testid='chevron-icon-wrapper'] >> nth=2").click();
    await page.frameLocator('#mfe').locator("span:has-text('FURNITURE')").waitFor();
    await page.frameLocator('#mfe').locator("[data-testid='chevron-icon-wrapper'] >> nth=3").click();
    await page.frameLocator('#mfe').locator("text=TABLES & CHAIRS").waitFor();
    await page.frameLocator('#mfe').locator("[data-testid='chevron-icon-wrapper'] >> nth=4").click();
    await page.frameLocator('#mfe').locator("text=SOPHIAWILLIAM WOOD PATIO 6 PIECES DINING >> nth=0").waitFor();
    let gittt = page.frameLocator('#mfe').locator("text=Influencing Factors");
    const boxxx = await gittt.boundingBox();
    if(box){
        const x = boxxx.x;
        await page.mouse.wheel(x, 0);
    }
    var bool = await page.frameLocator("button[text=Show Details]").isVisible();
    expect(bool).toBeTruthy();
})