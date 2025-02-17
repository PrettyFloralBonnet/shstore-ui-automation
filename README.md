# SH Store UI Automation

This is a set of example UI automated tests for basic functionality of [SH Store](https://shstore.eu/), a skateshop in Warsaw, Poland.

## Installation

Clone the repository and install the dependencies.

```
npm i
```

The project uses Typescript and Cypress.

**Note**: Currently, if you checkout the [NOID/cucumber-preprocessor](https://github.com/PrettyFloralBonnet/shstore-ui-automation/tree/NOID/cucumber-preprocessor) branch, the [Cypress Cucumber Preprocessor](https://github.com/badeball/cypress-cucumber-preprocessor) and its dependencies will also be installed.

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

### Login

A login command inside of `cy.session` is currently implemented but not used anywhere, due to issues with IP blocking encountered while running tests. For that reason, at least for now, I decided to stick to creating tests for functionality that doesn't require user login.

### Selectors

Selectors are, for the most part, extremely brittle (a lot of selecting elements by class etc.), due to lack of a better option in a production environment. Normally they would all, if possible, be substituted with suitable test IDs added to the application code.
