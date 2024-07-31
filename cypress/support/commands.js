import 'cypress-axe';

// Import the helper file
const { getAxeCorePath } = require('./path-helper');

Cypress.Commands.add('injectAxe', () => {
  const axeCorePath = getAxeCorePath();

  cy.readFile(axeCorePath).then((axeCoreJs) => {
    cy.window().then((win) => {
      // Inject the axe-core script into the page
      const script = win.document.createElement('script');
      script.innerHTML = axeCoreJs;
      win.document.head.appendChild(script);
    });
  });
});