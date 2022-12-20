const {test,expect, request}= require('@playwright/test');
const logindata=JSON.parse(JSON.stringify(require('../../testdata/Logindata.json')));
const inputdata=JSON.parse(JSON.stringify(require('../../testdata/ID_Dashboard.json'))); //convert json file to string format and then create a object for converted file
let webContext;

// test.beforeAll( async ({browser})=>
// {
//     const context=await browser.newContext(); //new broswer instance is created
//     const page=await context.newPage(); // new page will be launched with browser context defined
    
//     await page.goto(logindata.presaleslink);
    
//     console.log(await page.title());
//     await expect(page).toHaveTitle("Luminate Portal")
    
//     const signInBtn= page.locator('#login-button');
    
//      const [realmPage]=await Promise.all([
//          context.waitForEvent('page'),
//         await signInBtn.click(),
    
//     ])
    
//     const realmField = realmPage.locator('.textInput');
//     console.log(realmField); // storing realm text field
//     await realmField.fill(logindata.presalesrealm,{delay: 100});   // typing to realm
//     const continueBtn=realmPage.locator('#continue');   // capturing continue button
//     await continueBtn.click();                          // clicking the continue button
    
//     const account= realmPage.locator("[role='link']").last();
//     await account.click();
    
//     const emailID= realmPage.locator("[type='email']");
//     console.log(emailID);
//     await emailID.fill(logindata.username,{delay: 100});
//     const nextBtn= realmPage.locator("[value='Next']");
//     await nextBtn.click();

//     const pwd=realmPage.locator("[type='password']");
//     await pwd.fill(logindata.password,{delay: 100});
//     const signInBtnRealm = realmPage.locator("[type='submit']");
    
//     await signInBtnRealm.click();
//     await signInBtnRealm.click();
    
//     await page.waitForLoadState('networkidle');
//     const KPIImpact = page.frameLocator('#mfe').locator("text='KPI Impact'"); //write this way to identify locators in iframe
//     console.log(KPIImpact);
//     //await expect(KPIImpact).toContainText('KPI Impact');
//     await expect(KPIImpact).toHaveText('KPI Impact');
//     await context.storageState({path: 'LoginBypassCookies.json'});
//     webContext = await browser.newContext({storageState:'LoginBypassCookies.json'});

// });


test('Verify the defaults APIs(grids) in Dashboard Page',async ({browser})=>
{   
    webContext = await browser.newContext({storageState:'LoginBypassCookies.json'});
    const page = await webContext.newPage();
    await page.goto(logindata.presaleslink);
    
    await page.frameLocator('#mfe').locator(inputdata.KPIImpact).waitFor();
    await expect(page.frameLocator('#mfe').locator(inputdata.KPIImpact)).toHaveText('KPI Impact');
    //await page.pause();
    var bool = await page.frameLocator('#mfe').locator(inputdata.LocationHierarchy).isVisible();
    expect(bool).toBeTruthy();
    var bool = await page.frameLocator('#mfe').locator(inputdata.ProductHierarchy).isVisible();
    expect(bool).toBeTruthy();
    var bool = await page.frameLocator('#mfe').locator("button >> nth=0").isVisible();
    expect(bool).toBeTruthy();
    var bool = await page.frameLocator('#mfe').locator("button >> nth=1").isVisible();
    expect(bool).toBeTruthy();
    var bool = await page.frameLocator('#mfe').locator("text=Price Change Review").isVisible();
    expect(bool).toBeTruthy();
    //await page.pause();
});

