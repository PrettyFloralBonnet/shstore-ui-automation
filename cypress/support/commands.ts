/// <reference types="cypress" />

Cypress.Commands.add('consentToNecessaryCookiesOnly', () => {
    cy.get('a.rejectAll').click();
    cy.getCookie('iai_cookie')
        .should('exist')
        .then((cookie) => {
            let cookieValue = JSON.parse(cookie.value);
            expect(cookieValue).to.have.property('analytics', false);
            expect(cookieValue).to.have.property('marketing', false);
            return cookie;
        });
});
