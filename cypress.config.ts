import { defineConfig } from 'cypress';

export default defineConfig({
  viewportWidth: 1920,
  viewportHeight: 1080,
  e2e: {
    baseUrl: 'https://shstore.eu/',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
