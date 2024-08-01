const path = require('path');
// Access the file path based on the environment
const filePath = process.env.FILE_PATH || '../node_modules/axe-core/axe.min.js';

describe('Accessibility Validator', () => {
    beforeEach(() => {
        cy.visit(Cypress.env('URL_TO_TEST'));
        cy.injectAxe({ axeCorePath: './node_modules/axe-core/axe.min.js'});
      });

    it('Validate accessibility', () => {
        cy.checkA11y(null, {
        }, (violations) => {
            //cy.task('log', violations); // Log the violations
            if (violations.length) {
                throw new Error(JSON.stringify(violations, null, 2));
            }
        });
    });

    // it('Validate something', () => {
    //     cy.get(`head`);
    // });
});
