// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('submitEmptyForm', () => {
    cy.get('#submitContact').click();
    cy.get('.alert').should('be.visible');
});

Cypress.Commands.add('fillContactForm', (name, email, phone, subject, message) => {
    cy.get('input[placeholder="Name"]').type(name);
    cy.get('input[placeholder="Email"]').type(email);
    cy.get('input[placeholder="Phone"]').type(phone);
    cy.get('input[placeholder="Subject"]').type(subject);
    cy.get('[data-testid="ContactDescription"]').type(message);
});

Cypress.Commands.add('verifyErrorMessages', (messages) => {
    messages.forEach(msg => {
        cy.get('p').contains(msg);
    });
});

//info hosp
Cypress.Commands.add('verifyHotelInfo', () => {
    cy.get('h1').contains('Shady Meadows B&B');
    cy.get('address').contains('The Old Farmhouse, Shady Street, Newfordburyshire, NE1 4105');
    cy.get('p').contains('01234567891');
});

Cypress.Commands.add('verifyHotelDescription', (description) => {
    cy.get('p').contains(description);
});

Cypress.Commands.add('verifyImagesPresent', () => {
    cy.get('img').should('be.visible');
});
