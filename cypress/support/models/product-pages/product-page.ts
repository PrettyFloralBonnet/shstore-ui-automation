export default class ProductPage {
    getProductName(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get('#projector_productname').find('h1.product_name__name');
    }

    getProductPrice(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get('#projector_price_value');
    }

    getAddToCartButton(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get('#projector_button_basket');
    }
}
