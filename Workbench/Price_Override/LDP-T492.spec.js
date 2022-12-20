const {test,expect}= require('@playwright/test');
const logindata=JSON.parse(JSON.stringify(require('../../../testdata/Logindata.json'))); //convert json file to string format and then create a object for converted file

test('Verify Apply current values for all selected items functionality in tree view',async ({browser})=>
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
    //await git.click();

    //await page.pause();
    await page.waitForTimeout(3000);
    await frame.locator("input[type='text'] >> nth=3").waitFor();
    await frame.locator("input[type='text'] >> nth=3").click(); //select garden and outdoors checkbox
    await frame.locator("input[type='text'] >> nth=4").waitFor(); //select women apparel checkbox
    await frame.locator("input[type='text'] >> nth=4").click();
    var boolean = await frame.locator("[data-testid='menu-button-icon-button']").isVisible();
    expect(boolean).toBeTruthy();
    await frame.locator("[data-testid='menu-button-icon-button']").click(); //click on 3 dots
    var bool = await frame.locator("[data-testid='menu-button-listitem-1']").isEnabled();
    expect(bool).toBeTruthy();
    await frame.locator("[data-testid='menu-button-listitem-1']").click(); //select override

    await expect(frame.locator("text=Override (1/2): GARDEN & OUTDOORS")).toHaveText("Override (1/2): GARDEN & OUTDOORS"); //1st header of override pop up
    await frame.locator("[placeholder='Please enter override value']").type('5',{delay:100}); //enter value in 1st selection 
    await frame.locator("text=Current Price$12.99 – $1.24KProposed Price$3.99 – $1.24KCalculated New Price$4.1").textContent(); //after adding value we will get calculated price
    var apply = await frame.locator("[aria-label='Apply current values for all selected items']").isEnabled();
    expect(apply).toBeTruthy();
    await frame.locator("[aria-label='Apply current values for all selected items']").click(); //select apply 
    var next = await frame.locator("[aria-label='next']").isEnabled();
    expect(next).toBeTruthy();
    await frame.locator("[aria-label='next']").click(); //click on next in header
    await expect(frame.locator("text=Override (2/2): WOMENS APPAREL")).toHaveText("Override (2/2): WOMENS APPAREL"); //2nd header of override pop up
    await frame.locator("text=Current Price$42.99 – $89.99Proposed Price$12.99 – $89.99Calculated New Price$13").textContent();
    var cancel = await frame.locator("button:has-text('Cancel')").isEnabled();
    expect(cancel).toBeTruthy();
    var submit = await frame.locator("[aria-label='Submit Override']").isEnabled();
    expect(submit).toBeTruthy();
    await frame.locator("[aria-label='Submit Override']").click();
    await page.waitForTimeout(3000);
})