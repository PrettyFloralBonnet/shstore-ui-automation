/// <reference types="cypress" />

Cypress.Commands.add('consentToNecessaryCookiesOnly', () => {
    cy.get('a.rejectAll').click();
});
