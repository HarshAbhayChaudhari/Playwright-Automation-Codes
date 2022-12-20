const {test,expect}= require('@playwright/test');
const logindata=JSON.parse(JSON.stringify(require('../../../testdata/Logindata.json'))); //convert json file to string format and then create a object for converted file

test('Verify if Override button is disabled when unchecks the check box for a row in workbench',async ({browser})=>
{
    let webContext1;
    webContext1 = await browser.newContext({storageState:'LoginBypassCookies.json'});
    const page = await webContext1.newPage(); // new page will be launched with browser context defined
    await page.goto(logindata.presaleslink);
    const frame = page.frameLocator('#mfe');
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
    await frame.locator("input[type='checkbox'] >> nth=4").waitFor();
    await frame.locator("input[type='checkbox'] >> nth=4").click();
    await frame.locator("input[type='checkbox'] >> nth=4").waitFor();
    await frame.locator("input[type='checkbox'] >> nth=4").click();
    var boolean = await frame.locator("[data-testid='menu-button-icon-button']").isVisible();
    expect(boolean).toBeTruthy();
    await frame.locator("[data-testid='menu-button-icon-button']").click(); //click on 3 dots 
    var bool = await frame.locator("[data-testid='menu-button-listitem-1']").isDisabled();
    expect(bool).toBeTruthy();
    await frame.locator("[data-testid='menu-button-listitem-1']").textContent();
    //await page.pause();
})