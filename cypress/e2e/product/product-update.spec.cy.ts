describe('product update test', () => {
    it('visits the product page and updates a product', () => {
      cy.visit('/');
      cy.get('button').click();
      cy.contains('a', 'products').click();
      cy.contains('BOO1').click();
      cy.get('input[formcontrolname=costprice').clear().type('199.99');
      cy.contains('Save').click({force: true});
      cy.contains('updated!');
    });
  });
