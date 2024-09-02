describe('Validaciones de la página del hotel', { testIsolation: false }, () => {

    //info del hospedaje
    it('Verificar que la información del hotel esté presente', () => {
        cy.visit('https://automationintesting.online/');
        cy.get('p').contains('Shady Meadows B&B');
        cy.get('p').contains('The Old Farmhouse, Shady Street, Newfordburyshire, NE1 410S');
        cy.get('p').contains('012345678901');
    });

    //imágenes
    it('Asegurarse de que haya al menos una imagen visible', () => {
        cy.get('img').should('be.visible');
    });

    //texto
    it('Confirmar que el texto de la descripción del hotel sea el esperado', () => {
        const expectedDescription = "Welcome to Shady Meadows, a delightful Bed & Breakfast nestled in the hills on Newingtonfordburyshire. A place so beautiful you will never want to leave. All our rooms have comfortable beds and we provide breakfast from the locally sourced supermarket. It is a delightful place.";
        cy.get('p').contains(expectedDescription);
    });

});
