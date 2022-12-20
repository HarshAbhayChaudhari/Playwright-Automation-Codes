const {test,expect}= require('@playwright/test');
const logindata=JSON.parse(JSON.stringify(require('../../../testdata/Logindata.json'))); //convert json file to string format and then create a object for converted file
let webContext1;


test( 'Workbench Login', async({browser})=>
{   ///This test case should be run before executing any test case. 
    //This test case will do the complete login by taking the URL given at logindata.presaleslink and store 
    //all the login related cookies into Workbench.json file
    //If user wants to run this test case in another system change the URL variable in logindata.presaleslink to required system
    const context=await browser.newContext(); //new broswer instance is created
    const page=await context.newPage(); // new page will be launched with browser context defined
    
    await page.goto(logindata.presaleslink);
    
    //console.log(await page.title());
    await expect(page).toHaveTitle("Luminate Portal")
    
    const signInBtn= page.locator('#login-button');
    
     const [realmPage]=await Promise.all([
         context.waitForEvent('page'),
        await signInBtn.click(),
    
    ])
    
    const realmField = realmPage.locator('.textInput');
    console.log(realmField); // storing realm text field
    await realmField.fill(logindata.presalesrealm,{delay: 100});   // typing to realm
    const continueBtn=realmPage.locator('#continue');   // capturing continue button
    await continueBtn.click();                          // clicking the continue button
    
    const account= realmPage.locator("[role='link']").last();
    await account.click();
  
    
    const emailID= realmPage.locator("[type='email']");
    console.log(emailID);
    await emailID.fill(logindata.username,{delay: 100});
    const nextBtn= realmPage.locator("[value='Next']");
    await nextBtn.click();

    const pwd=realmPage.locator("[type='password']");
    await pwd.fill(logindata.password,{delay: 100});
    const signInBtnRealm = realmPage.locator("[type='submit']");
    
    await signInBtnRealm.click();
    await signInBtnRealm.click();

    
    await page.waitForLoadState('networkidle');
    // await page.frameLocator('#mfe').locator("text ='Workbench'").click();
    // await expect(page.frameLocator('#mfe').locator("text='KPI Impact'")).toHaveText('KPI Impact');

    await page.frameLocator('#mfe').locator("text ='Workbench'").click();
    await page.frameLocator('#mfe').locator("text='KPI Impact'").waitFor();
    await expect(page.frameLocator('#mfe').locator("text='KPI Impact'")).toHaveText('KPI Impact');

    await context.storageState({path: 'LoginBypassCookies.json'});
   webContext1 = await browser.newContext({storageState:'LoginBypassCookies.json'});

});