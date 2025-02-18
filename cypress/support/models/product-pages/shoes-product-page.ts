import ProductPage from "./product-page";

export default class ShoesProductPage extends ProductPage {
    getSizeSelectionDropdownButton(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get('#projector_sizes_cont').find('button.f-dropdown-toggle');
    }

    getSizeSelectionDropdownMenu(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get('#projector_sizes_cont').find('ul.f-dropdown-menu');
    }

    getAvailableSizes(): Cypress.Chainable<JQuery<HTMLElement>> {
        return this.getSizeSelectionDropdownMenu().find('a.f-dropdown-item');
    }
}
