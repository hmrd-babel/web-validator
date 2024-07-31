describe('Accessibility Validator', () => {
    beforeEach(() => {

        cy.visit(Cypress.env('URL_TO_TEST'));
        cy.task('log', "Injecting Axe");
        cy.injectAxe();
        cy.task('log', "Axe injected now");
      });

    it('Validate accessibility', () => {
        cy.checkA11y(null, {
        }, (violations) => {
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
