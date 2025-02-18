export default class PickupSitesForm {
    getOnSitePickupSite(): Cypress.Chainable<JQuery<HTMLInputElement>> {
        return cy.get('input#pickup_point_1');
    }

    getContinueButton(): Cypress.Chainable<JQuery<HTMLButtonElement>> {
        return cy.get('div.pickupl_submit').find('button[type="submit"]');
    }
}