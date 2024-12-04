describe('Adding a product', () => {
it('visits the product page and add a product', () => {
cy.visit('/')
cy.get('button').click();
cy.contains('a', 'products').click();
cy.contains('control_point').click();
cy.get('input[formcontrolname=id').type('BOO1');
cy.get('mat-select[formcontrolname=vendorid').click({ force: true });
cy.contains('Keith Edwards').click();
cy.get('input[formcontrolname=name')
  .click({ force: true })
  .type('Test Paper');
cy.get('input[formcontrolname=msrp').click({ force: true }).type('123.00');
cy.get('input[formcontrolname=costprice')
  .click({ force: true })
  .type('123.00');
cy.get('mat-expansion-panel').eq(0).click();
cy.get('mat-expansion-panel').eq(1).click();
cy.get('input[formcontrolname=rop').click({ force: true }).clear().type('5');
cy.get('input[formcontrolname=eoq').click({ force: true }).clear().type('6');
cy.get('input[formcontrolname=qoh').click({ force: true }).clear().type('7');
cy.get('input[formcontrolname=qoo').click({ force: true }).clear().type('8');
cy.get('button').contains('Save').click({ force: true });
cy.contains('added!');
});
});
