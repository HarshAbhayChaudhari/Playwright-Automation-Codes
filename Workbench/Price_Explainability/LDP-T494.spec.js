const {test,expect}= require('@playwright/test');
const logindata=JSON.parse(JSON.stringify(require('../../../testdata/Logindata.json'))); //convert json file to string format and then create a object for converted file

test('Verify that Price explainability modal is not shown at other aggregation levels other than lowest aggregation level',async ({browser})=>
{
    let webContext1;
    webContext1 = await browser.newContext({storageState:'LoginBypassCookies.json'});
    const page = await webContext1.newPage(); // new page will be launched with browser context defined
    await page.goto(logindata.presaleslink);
    const frame = page.frameLocator('#mfe');
    await page.frameLocator('#mfe').locator("text ='Workbench'").click();
    //await page.pause();
    var location = await frame.locator("[aria-label='button L_COUNTRY']").isEnabled();
    expect(location).toBeTruthy();
    await page.frameLocator('#mfe').locator("[aria-label='button L_COUNTRY']").click();
    let gitt = frame.locator("text=Additional Filters");
    const boxx =await gitt.boundingBox();
    if(boxx){
        const y = boxx.y;
        await page.mouse.wheel(0, y);
    }
    var apply = await frame.locator("button:has-text('Apply')").isEnabled();
    expect(apply).toBeTruthy();
    await frame.locator("button:has-text('Apply')").click();
    let git = page.frameLocator('#mfe').locator("[data-testid='chevron-icon-wrapper']");
    const box =await git.boundingBox();
    if(box){
        const y = box.y;
        await page.mouse.wheel(0, y);
    }
    await git.click();
    await git.click();
    await page.frameLocator('#mfe').locator("[data-testid='chevron-icon-wrapper'] >> nth=1").click();
    await page.frameLocator('#mfe').locator("[data-testid='chevron-icon-wrapper'] >> nth=2").click();
    
    await page.frameLocator('#mfe').locator("[data-testid='chevron-icon-wrapper'] >> nth=3").click();
    await page.frameLocator('#mfe').locator("[data-testid='chevron-icon-wrapper'] >> nth=4").click();
    
    let gittt = page.frameLocator('#mfe').locator("text=Influencing Factors");
    const boxxx = await gittt.boundingBox();
    if(box){
        const x = boxxx.x;
        await page.mouse.wheel(x, 0);
    }
    await gittt.textContent();
    //await page.pause();
    await frame.locator("td:nth-child(10) > span > .MuiSvgIcon-root >> nth=0").waitFor();
    await frame.locator("td:nth-child(10) > span > .MuiSvgIcon-root >> nth=0").click();
    await expect(frame.locator("text=Available Only on Lowest Level")).toHaveText("Available Only on Lowest Level");
    await page.waitForTimeout(3000);
    

})