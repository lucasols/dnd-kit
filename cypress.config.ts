import {defineConfig} from 'cypress';

export default defineConfig({
  projectId: 'zkn9qu',
  viewportHeight: 1000,
  scrollBehavior: false,
  e2e: {
    baseUrl: 'http://localhost:6006/',
    specPattern: 'cypress/e2e/**/*.cy.ts',
    supportFile: 'cypress/support/e2e.ts',
  },
});
