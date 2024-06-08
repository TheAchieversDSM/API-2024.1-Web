describe('Login', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000')
    cy.get('[name="email"]').type("teste@email.com");
    cy.get('[name="pwd"]').type("senha")
    cy.get('[name="button"]').click()
  })
})