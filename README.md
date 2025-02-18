# SH Store UI Automation

This is a set of example UI automated tests (written with TypeScript and Cypress) for basic functionality of [SH Store](https://shstore.eu/), a skateshop in Warsaw, Poland.

## Installation

Clone the repository and install the dependencies.

```
npm i
```

## Usage

To run tests in UI mode:

```
npm run e2e
```

To run tests headlessly:

```
npm run e2e:headless
```

## Notes

### Branches

Branch [`NOID/place-order-as-guest-test`](https://github.com/PrettyFloralBonnet/shstore-ui-automation/tree/NOID/place-order-as-guest-test) contains a test scenario that's 99% finished, but I didn't manage to run it (as of Feb 18th) due to issues with IP blocking (too many requests to the store's forms).

Branch [`NOID/cucumber-preprocessor`](https://github.com/PrettyFloralBonnet/shstore-ui-automation/tree/NOID/cucumber-preprocessor) is behind both `master` and `NOID/place-order-as-guest-test`, but contains the necessary config for the [Cypress Cucumber Preprocessor](https://github.com/badeball/cypress-cucumber-preprocessor/tree/master).

### Login

A login command (inside of `cy.session`) is currently implemented but not used anywhere, due to aforementioned issues with IP blocking. For that reason, at least for now, I decided to stick to creating tests for functionality that doesn't require user login.

### Selectors

Selectors are, for the most part, extremely brittle (a lot of selecting elements by class etc.), due to lack of a better option in a production environment. Normally all these selectors would, if possible, be substituted with suitable test IDs added to the application code.
