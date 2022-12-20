const {test,expect}= require('@playwright/test');
const logindata=JSON.parse(JSON.stringify(require('../../../testdata/Logindata.json'))); //convert json file to string format and then create a object for converted file

test('Verify the TPRs columns in Price Recommendations settings pop up',async ({browser})=>
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
    //await git.click();
    //await git.click();
    await page.pause()
    
    await page.frameLocator('#mfe').locator("[data-testid='lui-ccl-cardheader'] button >> nth=1").click();
    //await page.frameLocator('#mfe').locator("div[role='button']:has-text('Temporary Price Reductions (TPRs)").textContent();
    //await page.pause();

    let gitt = page.frameLocator('#mfe').locator("div:nth-child(14) > .card-item > .MuiButtonBase-root");
    const boxx = await gitt.boundingBox();
    if(boxx){
        const x = box.y;
        await page.mouse.wheel(0, x);
    }
    await gitt.click();
})