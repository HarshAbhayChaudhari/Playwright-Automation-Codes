const {test,expect, request}= require('@playwright/test');
const logindata=JSON.parse(JSON.stringify(require('../../../testdata/Logindata.json'))); //convert json file to string format and then create a object for converted file
const inputdata=JSON.parse(JSON.stringify(require('../../../testdata/ID_ScenarioAnalysis.json')));
let webContext2;
//let webContext3;

test( 'Verify the default fields in Filters grid',async({browser})=>
{
    //  const context=await browser.newContext(); //new broswer instance is created
    //  const page=await context.newPage(); // new page will be launched with browser context defined
    
    //  await page.goto(logindata.presaleslink);
    
    //  console.log(await page.title());
    //  await expect(page).toHaveTitle("Luminate Portal")
    
    //  const signInBtn= page.locator('#login-button');
    
    //  const [realmPage]=await Promise.all([
    //     context.waitForEvent('page'),
    //     await signInBtn.click(),
    
    //  ])
    
    //  const realmField = realmPage.locator('.textInput');
    //  console.log(realmField); // storing realm text field
    //  await realmField.fill(logindata.presalesrealm,{delay: 100});   // typing to realm
    //  const continueBtn=realmPage.locator('#continue');   // capturing continue button
    //  await continueBtn.click();                          // clicking the continue button
    
    //  const account= realmPage.locator("[role='link']").last();
    //  await account.click();
    
    // const emailID= realmPage.locator("[type='email']");
    // console.log(emailID);
    // await emailID.fill(logindata.username,{delay: 100});
    // const nextBtn= realmPage.locator("[value='Next']");
    // await nextBtn.click();

    //  const pwd=realmPage.locator("[type='password']");
    //  await pwd.fill(logindata.password,{delay: 100});
    //  const signInBtnRealm = realmPage.locator("[type='submit']");
    
    // await signInBtnRealm.click();
    // await signInBtnRealm.click();
    
    //  await page.waitForLoadState('networkidle');
    //  await page.frameLocator('#mfe').locator("text ='Scenario Analysis'").click();
    //  await page.frameLocator('#mfe').locator("text=View Prices and KPIs in").waitFor();
    //  await expect(page.frameLocator('#mfe').locator("text=View Prices and KPIs in")).toHaveText('View Prices and KPIs in');
    //  await context.storageState({path: 'LoginBypassCookies.json'});

    //for acme variable webContext3 and State4.json
    webContext2 = await browser.newContext({storageState:'LoginBypassCookies.json'});

    const page = await webContext2.newPage(); //for acme webContext3
    await page.goto(logindata.presaleslink); //for acme link1
    const frame = page.frameLocator('#mfe');
    await page.frameLocator('#mfe').locator("text ='Scenario Analysis'").click();
    await page.frameLocator('#mfe').locator("text=Aggregation Level").waitFor();
    //await page.pause();
    var bool = await frame.locator(inputdata.AggregationLevel).isVisible();
    expect(bool).toBeTruthy();
    var bool = await frame.locator(inputdata.ViewPricesAndKPIs).isVisible();
    expect(bool).toBeTruthy();
    var bool = await frame.locator(inputdata.Reset).isVisible();
    expect(bool).toBeTruthy();
    var bool = await frame.locator(inputdata.ScreenMax).isVisible();
    expect(bool).toBeTruthy();

    let git = frame.locator(inputdata.AdditionalFilters_DD);
    const box = await git.boundingBox();
    if(box){
        const y = box.y;
        await page.mouse.wheel(0, y);
    }
    var bool = frame.locator(inputdata.AdditionalFilters_DD).isVisible();
    expect(bool).toBeTruthy();
    await page.waitForTimeout(1000);
    var bool = await frame.locator(inputdata.ProductAttributes).isVisible();
    expect(bool).toBeTruthy();
    var bool = await frame.locator(inputdata.Apply).isVisible();
    expect(bool).toBeTruthy();
    await page.waitForTimeout(3000);
 })