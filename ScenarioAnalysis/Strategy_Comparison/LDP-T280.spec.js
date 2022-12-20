const {test,expect, request}= require('@playwright/test');
const logindata=JSON.parse(JSON.stringify(require('../../../testdata/Logindata.json'))); //convert json file to string format and then create a object for converted file
const inputdata=JSON.parse(JSON.stringify(require('../../../testdata/ID_ScenarioAnalysis.json')));
let webContext2;
//let webContext3;

test('Verify the Strategies in Strategy Comparision grid',async({browser})=>
{
    //for acme variable webContext3 and ScenarioAnalysisAcmeLogindata.json
    webContext2 = await browser.newContext({storageState:'LoginBypassCookies.json'});
    const page = await webContext2.newPage(); //for acme webContext3
    await page.goto(logindata.presaleslink); //for acme link1
    const frame = page.frameLocator('#mfe');
    await frame.locator(inputdata.ScenarioAnalysis).click();
    
    await page.waitForTimeout(3000);
    let git = page.frameLocator('#mfe').locator(inputdata.SSI);
    const box = await git.boundingBox();
    if(box){
        const y = box.y;
        await page.mouse.wheel(0, y);
    }
    await git.textContent();
    
    var Current = await frame.locator(inputdata.SC_CurrentStrategy).isVisible();
    expect(Current).toBeTruthy();
    
    var Constant = await frame.locator(inputdata.SC_ConstantStrategy).isVisible();
    expect(Constant).toBeTruthy();
    //for acme(inputdata.AcmeSC_BalancedStrategy) in the place of (inputdata.SC_MainStrategy)
    var Main = await frame.locator(inputdata.SC_MainStrategy).isVisible();
    expect(Main).toBeTruthy();
    //for acme (inputdata.AcmeSC_MaxProfitStrategy) in the place of (inputdata.SC_ProfitStrategy)
    var Profit = await frame.locator(inputdata.SC_ProfitStrategy).isVisible();
    expect(Profit).toBeTruthy();
   //for acme (inputdata.AcmeSC_MaxRevenueStrategy) in the place of (inputdata.SC_SellThruStrategy)
    var Sell = await frame.locator(inputdata.SC_SellThruStrategy).isVisible();
    expect(Sell).toBeTruthy();
   
    await page.waitForTimeout(3000);
})