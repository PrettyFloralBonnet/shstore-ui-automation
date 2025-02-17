/// <reference types="cypress" />

import { User } from "cypress/fixtures/users";

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

// not currently used anywhere because of issues with IP blocking
// due to too many logins when running tests
Cypress.Commands.add('login', (user: User) => {
    cy.session(
        user.email,
        () => {
            cy.visit('/');

            cy.get('#menu_additional').find('a.account_link').click();
            cy.url().should('contain', 'signin.php');

            cy.get('#user_login').type(user.email);
            cy.get('#user_pass').type(user.password);

            cy.get('button.signin_button').click();
        }, {
            validate() {
                cy.getCookie('login').should('exist');
                cy.getCookie('__idsual').should('exist');
                cy.getCookie('__idsui').should('exist');
            },
            cacheAcrossSpecs: true,
        });
});
