describe('Login', () => {
    it('should fail bc used wrong user', () => {
        cy.visit('http://localhost:3000')
        cy.get('[name="email"]').type("maria@email.com")
        cy.get('[name="pwd"]').type("segredo")
        cy.get('[name="button"]').click()

        cy.visit('http://localhost:3000/dashboard')
    })
})