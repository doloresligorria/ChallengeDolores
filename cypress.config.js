const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    chromeWebSecurity: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    
    defaultCommandTimeout: 10000,
    baseUrl: 'https://www.saucedemo.com',
    requestTimeout: 10000,
    pageLoadTimeout: 10000
  },
});
