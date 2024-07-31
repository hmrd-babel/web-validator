describe('Accessibility Validator', () => {
    beforeEach(() => {
        console.log('running Accessibility Validator');
        cy.visit(Cypress.env('URL_TO_TEST'));
        cy.injectAxe();
        console.log('All injected');
      });

    it('Validate accessibility', () => {
        console.log('Running checkA11y now');
        cy.checkA11y(null, {
        }, (violations) => {
            console.log('Logging violations');
            cy.task('log', violations); // Log the violations
            if (violations.length) {
                throw new Error(JSON.stringify(violations, null, 2));
            }
        });
    });

    // it('Validate something', () => {
    //     cy.get(`head`);
    // });
});
