export default class Catalog {
    getProducts(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get('div.product');
    }
}
