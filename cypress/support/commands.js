import 'cypress-axe';

// Import the helper file
const { getAxeCorePath } = require('./path-helper');

Cypress.Commands.add('injectAxe', () => {
  const axeCorePath = getAxeCorePath();

  cy.readFile('node_modules/axe-core/axe.min.js', { timeout: 10000 }).then((axeCoreJs) => {
    cy.window().then((win) => {
      // Inject the axe-core script into the page
      const script = win.document.createElement('script');
      script.innerHTML = axeCoreJs;
      win.document.head.appendChild(script);
    });
  });
});