describe('Login', () => {
  it('should fail bc used wrong user', () => {
    cy.visit('http://localhost:3000')
    cy.get('[name="email"]').type("teste@email.com")
    cy.get('[name="pwd"]').type("senha")
    cy.get('[name="button"]').click()
  })
  it('should succeed bc used existent user', () => {
    cy.visit('http://localhost:3000')
    cy.get('[name="email"]').type("maria@email.com")
    cy.get('[name="pwd"]').type("segredo")
    cy.get('[name="button"]').click()
  })
})