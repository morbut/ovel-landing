describe('Landing Page', () => {
  it('displays the OVEL hero and features', () => {
    cy.viewport(1280, 1000);
    cy.visit('http://localhost:5175');
    cy.wait(2000);
    cy.contains('Sprint Planning that stays OVEL the noise.').should('be.visible');
    cy.scrollTo('bottom', { duration: 4000 });
    cy.wait(1000);
    cy.scrollTo('top', { duration: 2000 });
    cy.wait(1000);
  });
});
