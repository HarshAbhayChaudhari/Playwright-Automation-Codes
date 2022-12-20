const {test,expect}= require('@playwright/test');
const logindata=JSON.parse(JSON.stringify(require('../../../testdata/Logindata.json'))); //convert json file to string format and then create a object for converted file

test('Verify the Price override with negative values in flat view',async ({browser})=>
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

    await page.frameLocator('#mfe').locator("[data-testid='flat-view-btn']").click();

    await page.frameLocator('#mfe').locator("input[type='text'] >> nth=4").waitFor();
    await page.frameLocator('#mfe').locator("input[type='text'] >> nth=4").click();
    var boolean = await frame.locator("[data-testid='menu-button-icon-button']").isVisible();
    expect(boolean).toBeTruthy();
    await frame.locator("[data-testid='menu-button-icon-button']").click();
    var bool = await frame.locator("[data-testid='menu-button-listitem-1']").isEnabled();
    expect(bool).toBeTruthy();
    await frame.locator("[data-testid='menu-button-listitem-1']").click();
    await expect(frame.locator("text=Override MAKITA 18-V LITH-ION BRUSHLESS 1/2 IN. CORDLESS")).toHaveText("Override MAKITA 18-V LITH-ION BRUSHLESS 1/2 IN. CORDLESS");
    await frame.locator("[placeholder='Please enter override value']").type('-30', {delay:100});
    var cancel = frame.locator("button:has-text('Cancel')").isEnabled();
    expect(cancel).toBeTruthy();
    await expect(frame.locator("button:has-text('Cancel')")).toHaveText("Cancel");
    var submit = await frame.locator("[aria-label='Submit Override']").isDisabled();
    expect(submit).toBeTruthy();
    await expect(frame.locator("[aria-label='Submit Override']")).toHaveText("Submit Override");
    await page.waitForTimeout(3000);
})