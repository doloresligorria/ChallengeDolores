describe('Swag Labs Testing', () => {
    beforeEach(() => {
        cy.intercept('POST', 'https://events.backtrace.io/api/summed-events/submit?universe=UNIVERSE&token=TOKEN', { statusCode: 200 }).as('backtrace');
        cy.intercept('POST', 'https://events.backtrace.io/api/unique-events/submit?universe=UNIVERSE&token=TOKEN', { statusCode: 200 }).as('backtrace');
    });

    //Usuario standard_user
    it('Logueo usuario correcto: standard_user', () => {
        cy.visit('/');
        cy.login('standard_user', 'secret_sauce');
        cy.addProduct('sauce-labs-bike-light');
        cy.completeform('Dolores', 'Ligorria', '12345');
        cy.logout();
    });

    //Usuario problem_user
    it('Logueo usuario correcto: problem_user', () => {
        cy.visit('/');
        cy.login('problem_user', 'secret_sauce');
        cy.addProduct('sauce-labs-bike-light');
        cy.completeform('Dolo', 'Leguiza', '12345');
        cy.logout();
    });
});
