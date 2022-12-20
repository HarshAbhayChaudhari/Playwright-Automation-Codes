// @ts-check
const { devices } = require('@playwright/test');

const config = {
  testDir: './tests',
  //retries : 2,
  workers : 4,
  /* Maximum time one test can run for. */
  timeout: 300 * 1000, //30sec
  expect: {
   
    timeout: 50000
    //The above statement means that it will wait 5 seconds for each step
    
  },
  /* Run tests in files in parallel */
  /*fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    
    browserName : 'firefox',
    headless : true,
    // viewport : {
    //   height:720,
    //   width: 1280
    // }
    //screenshot : 'on',
    //trace : 'retain-on-failure', //if we wan traces for all test cases

   
  },

 
};

module.exports = config;
