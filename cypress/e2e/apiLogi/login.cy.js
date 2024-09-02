describe('Enviar mensaje', { testIsolation: false }, () => {
    
    //campos vacíos
    it('Validar envío de form vacío', () => {
        cy.visit('https://automationintesting.online/');
        cy.log('Envío de form de contacto en blanco...');
        cy.submitEmptyForm();

        cy.verifyErrorMessages([
            'Subject must be between 5 and 100 characters.',
            'Subject may not be blank',
            'Name may not be blank',
            'Message must be between 20 and 2000 characters.',
            'Message may not be blank',
            'Email may not be blank',
            'Phone may not be blank',
            'Phone must be between 11 and 21 characters.'
        ]);
    });


    //data incorrecta
    it('Validar envío de form con data incorrecta', () => {
        cy.log('Set de datos incorrectos...');
        cy.fillContactForm('asd', 'asdasd', 'asdasd', 'asdasd', 'asdasd');
        cy.submitEmptyForm();

        cy.verifyErrorMessages([
            'Phone must be between 11 and 21 characters.',
            'debe ser una dirección de correo electrónico con formato correcto',
            'Message must be between 20 and 2000 characters.'
        ]);
    });

    //data correcta
    it('Validar envío de form con data correcta', () => {
        cy.log('Set de datos correctos...');
        cy.fillContactForm(
            'Juan Pérez',
            'juan@gmail.com',
            '35123696457',
            'Reserva de habitación para fecha X',
            'loremTestloremTestloremTestloremTestloremTestloremTestloremTestloremTestloremTestlo'
        );
        cy.submitEmptyForm();
    });


    

    // Test que validar que el mensaje haya sido enviado con éxito por medio de la API

    it('Validar que el mensaje fue enviado exitosamente mediante la API', () => {
        cy.intercept('POST', 'https://automationintesting.online/message/', {
            statusCode: 200,
            body: {
                success: true,
                message: 'Message sent successfully'
            }
        }).as('postMessage');

        cy.visit('https://automationintesting.online/');
        cy.fillContactForm(
            'Juan Pérez',
            'juan@gmail.com',
            '35123696457',
            'Reserva de habitación para fecha X',
            'loremTestloremTestloremTestloremTestloremTestloremTestloremTestloremTestloremTestlo'
        );
        cy.get('#submitContact').click();

        cy.wait('@postMessage').then((interception) => {
            assert.equal(interception.response.statusCode, 200, 'Status code is 200');
            assert.equal(interception.response.body.success, true, 'Response indicates success'); //V
            cy.log(interception.response.body.message);
        });

    });

    //Test interacciń con api
    it('respuesta de la solicitud GET', () => {
        cy.intercept('GET', 'https://automationintesting.online/room/', {
            statusCode: 200,
            body: {
                rooms: [{ roomName: '101', type: 'single' }]
            }
        }).as('getRooms');

        cy.visit('https://automationintesting.online/');

        //verificar la solicitud interceptada
        cy.wait('@getRooms').then((interception) => {
           
            expect(interception.response.statusCode).to.eq(200); //estado

            //Contenido de la respuesta
            expect(interception.response.body.rooms[0].roomName).to.eq('101');
        });
    });
    
    

});