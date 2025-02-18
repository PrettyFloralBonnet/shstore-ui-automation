export default class CustomerDataPage {

    getRegisterAndOrderButton(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get('a.signin-form_register');
    }

    getOrderAsGuestButton(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get('a.signin-form_once');
    }

    getNewCustomerForm(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get('div#client_new_client');
    }

    // customer data inputs

    getFirstNameInput(): Cypress.Chainable<JQuery<HTMLInputElement>> {
        return cy.get('input#client_firstname');
    }

    getLastNameInput(): Cypress.Chainable<JQuery<HTMLInputElement>> {
        return cy.get('input#client_lastname');
    }

    getStreetInput(): Cypress.Chainable<JQuery<HTMLInputElement>> {
        return cy.get('input#client_street');
    }

    getStreetNumberInput(): Cypress.Chainable<JQuery<HTMLInputElement>> {
        return cy.get('input#client_street_number');
    }

    getZipCodeInput(): Cypress.Chainable<JQuery<HTMLInputElement>> {
        return cy.get('input#client_zipcode');
    }

    getCityInput(): Cypress.Chainable<JQuery<HTMLInputElement>> {
        return cy.get('input#client_city');
    }

    getPhoneNumberInput(): Cypress.Chainable<JQuery<HTMLInputElement>> {
        return cy.get('input#client_phone');
    }

    getEmailInput(): Cypress.Chainable<JQuery<HTMLInputElement>> {
        return cy.get('input#client_email');
    }

    // TOS and marketing consent checkboxes

    getTOSCheckbox(): Cypress.Chainable<JQuery<HTMLInputElement>> {
        return cy.get('input#terms_agree');
    }

    getEmailNewsletterCheckbox(): Cypress.Chainable<JQuery<HTMLInputElement>> {
        return cy.get('input#client_mailing');
    }

    getTextMessageNewsletterCheckbox(): Cypress.Chainable<JQuery<HTMLInputElement>> {
        return cy.get('input#client_send_sms');
    }

    // submit form

    getContinueButton(): Cypress.Chainable<JQuery<HTMLButtonElement>> {
        return cy.get('button#submit_clientnew_form');
    }
}