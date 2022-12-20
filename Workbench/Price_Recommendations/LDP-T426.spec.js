const {test,expect}= require('@playwright/test');
const logindata=JSON.parse(JSON.stringify(require('../../../testdata/Logindata.json'))); //convert json file to string format and then create a object for converted file

test('Verify the TPRs column values in Price Recommendations grid at flat view',async ({browser})=>
{
    let webContext1;
    webContext1 = await browser.newContext({storageState:'LoginBypassCookies.json'});
    const page = await webContext1.newPage(); // new page will be launched with browser context defined
    await page.goto(logindata.presaleslink);

    await page.frameLocator('#mfe').locator("text ='Workbench'").click();
    //await page.pause();
    let git = page.frameLocator('#mfe').locator("[data-testid='chevron-icon-wrapper']");
    const box =await git.boundingBox();
    if(box){
        const y = box.y;
        await page.mouse.wheel(0, y);
    }
    await git.click();
    await git.click();
    //await page.pause();

    //await page.frameLocator('#mfe').locator("[data-testid='flat-view-btn']").click();

    let gitt = page.frameLocator('#mfe').locator("text=Current (PCS) >> nth=2");
    const boxx = await gitt.boundingBox();
    if(boxx){
        const x = boxx.x;
        await page.mouse.wheel(x, 0);
    }
    //await page.pause();
    
    await page.frameLocator('#mfe').locator("[data-testid='flat-view-btn']").click();
    await page.frameLocator('#mfe').locator("text=Temporary Price Reductions (TPRs)").textContent();

})