
//Loguo
Cypress.Commands.add('login', (username, password) => {
    cy.get('[data-test="username"]').type(username);
    cy.get('[data-test="password"]').type(password);
    cy.get('[data-test="login-button"]').click();
    cy.url().should('include', '/inventory.html');
    cy.get('.error-message-container').should('not.exist'); //no mensaje, usuario correcto; mensaje, usuario incorrecto
});

//Add producto
Cypress.Commands.add('addProduct', (item) => {
    cy.get(`[data-test="add-to-cart-${item}"]`).click();
    cy.get(`[data-test="remove-${item}"]`).should('be.visible');
});

//Completar form
Cypress.Commands.add('completeform', (firstName, lastName, postalCode) => {
    cy.get('[data-test="shopping-cart-link"]').click();
    cy.get('[data-test="checkout"]').click();
    cy.get('[data-test="firstName"]').type(firstName);
    cy.get('[data-test="lastName"]').type(lastName);
    cy.get('[data-test="postalCode"]').type(postalCode);
    cy.get('[data-test="continue"]').click();

    //error en formulario (pasa usuario problem_user)
    cy.get('body').then($body => {
        if ($body.find('[data-test="error-button"]').length > 0) {
            // Si existe, se valida el mensaje de error
            cy.get('[data-test="error-button"]').should('be.visible');
            throw new Error('Formulario incompleto o erróneo');
        } 
    });
});

//salir del form; logout
Cypress.Commands.add('logout', () => {
    cy.get('[data-test="finish"]').click();
    cy.get('[data-test="back-to-products"]').click();
    cy.contains('Open Menu').click();
    cy.get('[data-test="logout-sidebar-link"]').click();

});
