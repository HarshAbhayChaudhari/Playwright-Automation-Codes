const {test,expect, request}= require('@playwright/test');
const logindata=JSON.parse(JSON.stringify(require('../../../testdata/Logindata.json'))); //convert json file to string format and then create a object for converted file
const inputdata=JSON.parse(JSON.stringify(require('../../../testdata/ID_ScenarioAnalysis.json')));
let webContext2;
//let webContext3;
test('Verify that the multiple strategies are available in the application are shown in different rows in the Strategy Comparision grid',async({browser})=>
{
    //for acme variable webContext3 and ScenarioAnalysisAcmeLogindata.json
    webContext2 = await browser.newContext({storageState:'LoginBypassCookies.json'});
    const page = await webContext2.newPage(); //for acme webContext3
    await page.goto(logindata.presaleslink);  //for acme link1
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
    await page.waitForTimeout(3000);
    var Current = await frame.locator(inputdata.SC_CurrentStrategyBottom).isVisible();
    expect(Current).toBeTruthy();
    
    var Constant = await frame.locator(inputdata.SC_ConstantStrategyBottom).isVisible();
    expect(Constant).toBeTruthy();
    //for the (inputdata.AcmeSC_BalancedStrategyBottom) in the place (inputdata.SC_MainStrategyBottom)
    var Main = await frame.locator(inputdata.SC_MainStrategyBottom).isVisible();
    expect(Main).toBeTruthy();
    //for acme (inputdata.AcmeSC_MaxProfitStrategyBottom) in the place of (inputdata.SC_ProfitStrategyBottom)
    var Profit = await frame.locator(inputdata.SC_ProfitStrategyBottom).isVisible();
    expect(Profit).toBeTruthy();
    //for acme (inputdata.AcmeSC_MaxRevenueStrategyBottom) in the place of (inputdata.SC_SellThruStrategyBottom)
    var Sell = await frame.locator(inputdata.SC_SellThruStrategyBottom).isVisible();
    expect(Sell).toBeTruthy();
   
    await page.waitForTimeout(3000);
})