export default class OrderSummary {
    getCustomerDataSummary(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get('div[id$="info_sub1"]');
    }

    getOrderedProductsElement() {
        return cy.get('div[id$="_products"]');
    }

    getOrderTotal(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get('div.basketedit_total_summary');
    }

    getTOSCheckbox(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get('input[name$="terms_conditions"]');
    }

    getRightToWithdrawalCheckbox(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get('input[name$="cancel"]');
    }

    getFinalizeOrderButton(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get('input.btn[type="submit"]');
    }
}