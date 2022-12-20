const {test,expect}= require('@playwright/test');
const logindata=JSON.parse(JSON.stringify(require('../../testdata/Logindata.json'))); //convert json file to string format and then create a object for converted file
const inputdata=JSON.parse(JSON.stringify(require('../../testdata/ID_Dashboard.json'))); //convert json file to string format and then create a object for converted file

test('Verify the Drag and Drop feature for KPIs in KPI Impact Settings pop up',async ({browser})=>
{
    let webContext;
    webContext = await browser.newContext({storageState:'LoginBypassCookies.json'});
    const page = await webContext.newPage();
    await page.goto(logindata.presaleslink);
    await page.frameLocator('#mfe').locator(inputdata.KPIImpact).waitFor();
    await expect(page.frameLocator('#mfe').locator(inputdata.KPIImpact)).toHaveText('KPI Impact');
    await page.frameLocator('#mfe').locator(inputdata.Settings).click();
    //await page.pause();

    const src = await page.frameLocator('#mfe').locator("button >> svg[focusable='false'] >> nth=4");
    const dst = await page.frameLocator('#mfe').locator(".column-card >> nth=0");
    if(src && dst){
        const srcBound = await src.boundingBox();
        const dstBound = await dst.boundingBox();
        if(srcBound && dstBound){
            await page.mouse.move(srcBound.x, srcBound.y);
            await page.mouse.down();
            await page.mouse.move(dstBound.x, dstBound.y);
            await page.mouse.down();
        }
        else{
            throw new Error("No Element");
        }
    }
});