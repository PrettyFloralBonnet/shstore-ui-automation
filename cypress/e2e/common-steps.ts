import { Given } from "@badeball/cypress-cucumber-preprocessor";

Given('The user is on the main store page', () => {
    cy.visit('/');
    // add assertion to verify we are on the main store page
});
