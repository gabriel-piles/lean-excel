describe ('Third Test', () => {
    it ('Focus on the input', () => {
        cy.visit ('/');

        cy.get('.B3').click();
        cy.get('.input-box').type('3');
        cy.get('.input-box').type('{enter}');

        cy.get('.B2').click();
        cy.get('.input-box').type('2');
        cy.get('.input-box').type('{enter}');

        cy.get('.B1').click();
        cy.get('.input-box').type('1');
        cy.get('.input-box').type('{enter}');

        cy.get('.A1').click();
        cy.get('.input-box').type('SUM(B1:B3) * AVG(B1:B3) + 10 =');
        cy.get('.input-box').type('{enter}');

        cy.get('.A2').click();
        cy.get('.input-box').type('=SUM(B1:B3) * AVG(B1:B3) + 10');
        cy.get('.input-box').type('{enter}');

        cy.contains('.A1','SUM(B1:B3) * AVG(B1:B3) + 10 =');
        cy.contains('.A2','22');

        cy.get('.A1').click();
    });
});