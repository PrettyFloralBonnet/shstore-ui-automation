export default class OrderForm {
    getPaymentOptionsSection(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get('section.order__payments');
    }

    getOrderDeliverySection(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get('section.order__delivery');
    }

    getPaymentOnPickupOption(): Cypress.Chainable<JQuery<HTMLElement>> {
        return this.getPaymentOptionsSection().find('div#dvp_payment');
    }

    getOnSitePickupOption(): Cypress.Chainable<JQuery<HTMLElement>> {
        return this.getOrderDeliverySection()
            .find('div.order__delivery_group')
            .contains('ODBIÓR OSOBISTY')
            .filter(':visible');
    }

    getContinueButton(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get('a.summary__button');
    }
}