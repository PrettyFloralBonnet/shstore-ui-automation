declare namespace Cypress {
    interface Chainable {
        /**
         * Closes the cookie consent form using the "necessary cookies only" option
         */
        consentToNecessaryCookiesOnly(): void;
    }
}
