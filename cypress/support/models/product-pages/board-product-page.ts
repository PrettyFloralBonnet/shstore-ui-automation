import ProductPage from "./product-page";

export default class BoardProductPage extends ProductPage {
    getAvailableSizes(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get('#projector_sizes_cont').find('a.projector_sizes__item');
    }
}
