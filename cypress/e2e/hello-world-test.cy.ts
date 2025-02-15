describe('Hello world', () => {
    it('should load the main store page', () => {
        cy.visit('/');
        cy.url().should('contain', 'shstore.eu');
        cy.get('#logo').should('be.visible');
    });
});
