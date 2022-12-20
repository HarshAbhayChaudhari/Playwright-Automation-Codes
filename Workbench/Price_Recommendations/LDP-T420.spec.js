const {test,expect}= require('@playwright/test');
const logindata=JSON.parse(JSON.stringify(require('../../../testdata/Logindata.json'))); //convert json file to string format and then create a object for converted file

test('Verify the alert pop up message when user switches from tree view to flat view after a price override',async ({browser})=>
{
    let webContext1;
    webContext1 = await browser.newContext({storageState:'LoginBypassCookies.json'});
    const page = await webContext1.newPage(); // new page will be launched with browser context defined
    await page.goto(logindata.presaleslink);
    const frame = page.frameLocator('#mfe');
    await frame.locator("text ='Workbench'").click();
    
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

    await frame.locator("[data-testid='input-override'] input[type='text']").type('1.8',{delay:100});
    var bool =  frame.locator("[data-testid='flat-view-btn']").isVisible();
    expect(bool).toBeTruthy();
    await frame.locator("[data-testid='flat-view-btn']").click();
    var popup = frame.locator("text=You are currently in the middle of performing override. You’ll lose your data if you switch to a different view. Would you still like to continue").isVisible();
    expect(popup).toBeTruthy();
    var StayHere = frame.locator("button:has-text('Stay Here')").isEnabled();
    expect(StayHere).toBeTruthy();
    await frame.locator("button:has-text('Stay Here')").click();
    var boolean =  frame.locator("[data-testid='flat-view-btn']").isVisible();
    expect(boolean).toBeTruthy();
    await frame.locator("[data-testid='flat-view-btn']").click();
    var PopUp = frame.locator("text=You are currently in the middle of performing override. You’ll lose your data if you switch to a different view. Would you still like to continue").isVisible();
    expect(PopUp).toBeTruthy();
    var apply = frame.locator("[data-testid='apply-modal-btn']").isEnabled();
    expect(apply).toBeTruthy();
    await frame.locator("[data-testid='apply-modal-btn']").click();

    //await page.pause();
})