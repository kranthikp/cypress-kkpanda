const { defineConfig } = require("cypress");
const allureWriter = require('@shelex/cypress-allure-plugin/writer');
// import allureWriter from "@shelex/cypress-allure-plugin/writer";

module.exports = defineConfig({
    chromeWebSecurity: false,
    video: false,
    screenshotOnRunFailure: true,
    reporter: "cypress-mochawesome-reporter",
    reporterOptions: {
        reporterEnabled: "cypress-mochawesome-reporter",
        mochawesomeReporterOptions: {
            reportDir: "cypress/reports/cypress",
            quite: true,
            overwrite: true,
            html: true,
            json: true
        },
    }, 
    e2e: {
        specPattern: '**/*.cy.js',
        setupNodeEvents(on, config) {
            require('cypress-mochawesome-reporter/plugin')(on);
            // allureWriter(on, config);
            return config;
        },

    },
    env: {
        API_BASE_URL: "https://reqres.in",
        fpurl: "stg"
    },
    retries: {
        openMode: 2,
        runMode: 2
    },

});
