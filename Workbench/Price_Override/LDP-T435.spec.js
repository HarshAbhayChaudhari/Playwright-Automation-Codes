const {test,expect}= require('@playwright/test');
const logindata=JSON.parse(JSON.stringify(require('../../../testdata/Logindata.json'))); //convert json file to string format and then create a object for converted file

test('Verify the Overriden column behavior in tree view',async ({browser})=>
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
   
    //await page.pause();
    await frame.locator("input[type='text'] >> nth=3").waitFor();
    await frame.locator("input[type='text'] >> nth=3").click();
    var boolean = await frame.locator("[data-testid='menu-button-icon-button']").isVisible();
    expect(boolean).toBeTruthy();
    await frame.locator("[data-testid='menu-button-icon-button']").click();
    var bool = await frame.locator("[data-testid='menu-button-listitem-1']").isEnabled();
    expect(bool).toBeTruthy();
    await frame.locator("[data-testid='menu-button-listitem-1']").click();
    await expect(frame.locator("text=Override GARDEN & OUTDOORS")).toHaveText("Override GARDEN & OUTDOORS");
    var cancel = await frame.locator("button:has-text('Cancel')").isEnabled();
    expect(cancel).toBeTruthy();
    await expect(frame.locator("button:has-text('Cancel')")).toHaveText("Cancel");
    var Boolean = await frame.locator("[aria-label='Submit Override']").isDisabled();
    expect(Boolean).toBeTruthy();
    await expect(frame.locator("[aria-label='Submit Override']")).toHaveText("Submit Override");
    var location = await frame.locator("text=locationAll").isVisible();
    expect(location).toBeTruthy();
    await frame.locator("[placeholder='Please enter override value']").type('4', {delay:100});
    var submit = await frame.locator("[aria-label='Submit Override']").isEnabled();
    expect(submit).toBeTruthy();
    await frame.locator("[aria-label='Submit Override']").click();
    await page.waitForTimeout(3000);
    //await page.pause();
})