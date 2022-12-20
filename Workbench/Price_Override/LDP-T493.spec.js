const {test,expect}= require('@playwright/test');
const logindata=JSON.parse(JSON.stringify(require('../../../testdata/Logindata.json'))); //convert json file to string format and then create a object for converted file

test('Verify Apply current values for all selected items functionality in flat view',async ({browser})=>
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

    await frame.locator("[data-testid='flat-view-btn']").click();
    await page.waitForTimeout(3000);
    await frame.locator("input[type='text'] >> nth=2").waitFor();
    await frame.locator("input[type='text'] >> nth=2").click();
    await frame.locator("input[type='text'] >> nth=3").waitFor();
    await frame.locator("input[type='text'] >> nth=3").click();
    var boolean = await frame.locator("[data-testid='menu-button-icon-button']").isVisible();
    expect(boolean).toBeTruthy();
    await frame.locator("[data-testid='menu-button-icon-button']").click();
    var bool = await frame.locator("[data-testid='menu-button-listitem-1']").isEnabled();
    expect(bool).toBeTruthy();
    await frame.locator("[data-testid='menu-button-listitem-1']").click();

    await expect(frame.locator("text=Override (1/2): LAWNSCAPE PROPATCH LAWN REPAIR 3.5LB")).toHaveText("Override (1/2): LAWNSCAPE PROPATCH LAWN REPAIR 3.5LB");
    await frame.locator("[placeholder='Please enter override value']").type('10', {delay:100});
    await frame.locator("text=Current Price$13.99Proposed Price$3.99Calculated New Price$10").textContent(); //after adding value we will get calculated price
    var apply = await frame.locator("[aria-label='Apply current values for all selected items']").isEnabled();
    expect(apply).toBeTruthy();
    await frame.locator("[aria-label='Apply current values for all selected items']").click();
    var next = await frame.locator("[aria-label='next']").isEnabled();
    expect(next).toBeTruthy();
    await frame.locator("[aria-label='next']").click();
    await expect(frame.locator("text=Override (2/2): SCOTTS TURF BUILDER KENTUCKY BLUEGRASS")).toHaveText("Override (2/2): SCOTTS TURF BUILDER KENTUCKY BLUEGRASS");
    await frame.locator("text=Current Price$49.99Proposed Price$14.99Calculated New Price$10").textContent(); //after adding value we will get calculated price
    var cancel = await frame.locator("button:has-text('Cancel')").isEnabled();
    expect(cancel).toBeTruthy();
    var submit = await frame.locator("[aria-label='Submit Override']").isEnabled();
    expect(submit).toBeTruthy();
    await frame.locator("[aria-label='Submit Override']").click();
    await page.waitForTimeout(3000);

    //await page.pause();
})