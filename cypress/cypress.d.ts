declare namespace Cypress {
    interface Chainable {
        /**
         * Closes the cookie consent form using the "necessary cookies only" option
         * and returns the resulting cookie
         */
        consentToNecessaryCookiesOnly(): Chainable<Cypress.Cookie>;

        /**
         * logs in the provided user via the UI
         *
         * @param user user fixture with email and password data
         */
        login(user: import('cypress/fixtures/users').User): void;
    }
}
