describe ('Third Test', () => {
    it ('Focus on the input', () => {
        cy.visit ('/');
        cy.get('.A5').click();
        cy.get('.input-box').type('=SUM(B5:B7) * AVG(B5:B7) + 10');
        cy.get('.input-box').type('{enter}');

        cy.get('.B5').click();
        cy.get('.input-box').type('1');
        cy.get('.input-box').type('{enter}');

        cy.get('.B6').click();
        cy.get('.input-box').type('2');
        cy.get('.input-box').type('{enter}');

        cy.get('.B7').click();
        cy.get('.input-box').type('3');
        cy.get('.input-box').type('{enter}');

        cy.get('.A5').should('have.value', '22');
    });
});