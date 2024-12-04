describe('product delete test', () => {
    it('visits the product page and deletes a product', () => {
      cy.visit('/');
      cy.get('button').click();
      cy.contains('a', 'products').click();
      cy.contains('BOO1').click();
      cy.get('button').contains('Delete').click();
      cy.contains('deleted!');
    });
  });
