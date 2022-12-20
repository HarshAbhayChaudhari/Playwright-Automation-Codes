const {test,expect}= require('@playwright/test');
const logindata=JSON.parse(JSON.stringify(require('../../../testdata/Logindata.json'))); //convert json file to string format and then create a object for converted file

test('Verify the Price override with positive values in tree view',async ({browser})=>
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
    await git.textContent();
    
    //await page.pause();
    await page.waitForTimeout(3000);
    await frame.locator("[data-testid='flat-view-btn']").click();
    await page.waitForTimeout(3000);
    await frame.locator("input[type='text'] >> nth=2").waitFor();
    await frame.locator("input[type='text'] >> nth=2").click(); //click on checkbox of LAWNSCAPE PROPATCH LAWN REPAIR
    await frame.locator("input[type='text'] >> nth=3").waitFor(); 
    await frame.locator("input[type='text'] >> nth=3").click();//click on checkbox of SCOTTS TURF BUILDER KENTUCKY BLUEGRASS
    var boolean = await frame.locator("[data-testid='menu-button-icon-button']").isVisible();
    expect(boolean).toBeTruthy();
    await frame.locator("[data-testid='menu-button-icon-button']").click(); //click on 3 dots 
    var bool = await frame.locator("[data-testid='menu-button-listitem-1']").isEnabled();
    expect(bool).toBeTruthy();
    await frame.locator("[data-testid='menu-button-listitem-1']").click(); //select override pop up
    await expect(frame.locator("text=Override (1/2): LAWNSCAPE PROPATCH LAWN REPAIR 3.5LB")).toHaveText("Override (1/2): LAWNSCAPE PROPATCH LAWN REPAIR 3.5LB"); //1st header of override pop up
    await frame.locator("[placeholder='Please enter override value']").type('8', {delay:100}); //enter value in 1st selection
    await frame.locator("text=Current Price$13.99Proposed Price$3.99Calculated New Price$8").textContent(); 

    var next = await frame.locator("[aria-label='next']").isEnabled(); //click on next in header
    expect(next).toBeTruthy();
    await frame.locator("[aria-label='next']").click();
    await expect(frame.locator("text=Override (2/2): SCOTTS TURF BUILDER KENTUCKY BLUEGRASS")).toHaveText("Override (2/2): SCOTTS TURF BUILDER KENTUCKY BLUEGRASS"); //2nd header of override pop up
    await frame.locator("[placeholder='Please enter override value']").type('10', {delay:100}); //enter value in 2nd selection
    await frame.locator("text=Current Price$49.99Proposed Price$14.99Calculated New Price$10").textContent(); //after adding value we will get calculative price
    var cancel = await frame.locator("button:has-text('Cancel')").isEnabled();
    expect(cancel).toBeTruthy();
    await frame.locator("button:has-text('Cancel')").textContent();
    var submit = await frame.locator("[aria-label='Submit Override']").isEnabled();
    expect(submit).toBeTruthy();
    await frame.locator("[aria-label='Submit Override']").click();//click on submit override button
    await page.waitForTimeout(3000);
    
    //await page.pause();
})