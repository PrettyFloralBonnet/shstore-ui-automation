declare namespace Cypress {
    interface Chainable {
        /**
         * Closes the cookie consent form using the "necessary cookies only" option
         * and returns the resulting cookie
         */
        consentToNecessaryCookiesOnly(): Chainable<Cypress.Cookie>;
    }
}
