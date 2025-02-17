export default class Navbar {
    getSection(section: string): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get('a.nav-link').contains(section);
    }
}
