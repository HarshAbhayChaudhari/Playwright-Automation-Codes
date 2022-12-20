const {test,expect}= require('@playwright/test');
const logindata=JSON.parse(JSON.stringify(require('../../../testdata/Logindata.json'))); //convert json file to string format and then create a object for converted file

test('Verify the new Column addition in UI Influencing Factor',async ({browser})=>
{
    let webContext1;
    webContext1 = await browser.newContext({storageState:'LoginBypassCookies.json'});
    const page = await webContext1.newPage(); // new page will be launched with browser context defined
    await page.goto(logindata.presaleslink);
    const frame = page.frameLocator('#mfe');
    await frame.locator("text ='Workbench'").click();
    //await page.pause();
    let git = frame.locator("[data-testid='chevron-icon-wrapper']");
    const box =await git.boundingBox();
    if(box){
        const y = box.y;
        await page.mouse.wheel(0, y);
    }
    await git.click();
    await git.click();

    //await page.pause();

    let gitt = frame.locator("text=Influencing Factors");
    const boxx = await gitt.boundingBox();
    if(box){
        const x = boxx.x;
        await page.mouse.wheel(x, 0);
    }
    await gitt.click();
    var bool = frame.locator("text=Influencing Factors").isVisible();
    expect(bool).toBeTruthy();
    await expect(frame.locator("text=Influencing Factors")).toHaveText("Influencing Factors");
    await page.waitForTimeout(3000);
})