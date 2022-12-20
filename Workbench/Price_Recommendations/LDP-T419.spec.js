const {test,expect}= require('@playwright/test');
const logindata=JSON.parse(JSON.stringify(require('../../../testdata/Logindata.json'))); //convert json file to string format and then create a object for converted file

test('Verify the alert pop up message when user switches from tree view to flat view',async ({browser})=>
{
    let webContext1;
    webContext1 = await browser.newContext({storageState:'LoginBypassCookies.json'});
    const page = await webContext1.newPage(); // new page will be launched with browser context defined
    await page.goto(logindata.presaleslink);
    const frame = page.frameLocator('#mfe');
    await page.frameLocator('#mfe').locator("text ='Workbench'").click();
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
    var bool = frame.locator("[data-testid='flat-view-btn']").isVisible();
    expect(bool).toBeTruthy();
    await frame.locator("[data-testid='flat-view-btn']").click();
    var popup = frame.locator("text=You have selected multiple rows in the table. Your selection will be cleared when you switch to a different table view.Would you still like to continue?").isVisible();
    expect(popup).toBeTruthy();
    var StayHere = frame.locator("button:has-text('Stay Here')").isEnabled();
    expect(StayHere).toBeTruthy();
    await frame.locator("button:has-text('Stay Here')").click();
    var boolean = frame.locator("[data-testid='flat-view-btn']").isVisible();
    expect(boolean).toBeTruthy();
    await frame.locator("[data-testid='flat-view-btn']").click();
    var apply = frame.locator("[data-testid='apply-modal-btn']").isEnabled();
    expect(apply).toBeTruthy();
    await frame.locator("[data-testid='apply-modal-btn']").click();
    //await page.pause();
    //await page.frameLocator('#mfe').locator("span['.MuiButton-label'] has-text['Stay Here']").click()

    //await page.pause();
})