describe('Create user', () => {
    let number = Math.floor(Math.random() * 100000);

    it('should succeed bc created user correctly', () => {
        cy.visit('http://localhost:3000')
        cy.get('[name="email"]').type("maria@email.com")
        cy.get('[name="pwd"]').type("segredo")
        cy.get('[name="button"]').click()

        cy.visit('http://localhost:3000/cadastro-usuarios')
        cy.get('[name="email"]').type(`test${number}@email.com`)
        cy.get('[name="name"]').type("Test Name")
        cy.get('[name="pwd"]').type("Secret2")
        cy.get('[name="pwdconfirm"]').type("Secret2")
        cy.get('[name="button"]').click()
    })
    it('should fail bc created user w same email', () => {
        cy.visit('http://localhost:3000')
        cy.get('[name="email"]').type("maria@email.com")
        cy.get('[name="pwd"]').type("segredo")
        cy.get('[name="button"]').click()

        cy.visit('http://localhost:3000/cadastro-usuarios')
        cy.get('[name="email"]').type(`test${number}@email.com`)
        cy.get('[name="name"]').type("Test Name")
        cy.get('[name="pwd"]').type("Secret2")
        cy.get('[name="pwdconfirm"]').type("Secret2")
        cy.get('[name="button"]').click()
    })

    number = Math.floor(Math.random() * 100000);
    // email validation
    it('should fail bc created user w invalid email [no .com, for ex]', () => {
        cy.visit('http://localhost:3000')
        cy.get('[name="email"]').type("maria@email.com")
        cy.get('[name="pwd"]').type("segredo")
        cy.get('[name="button"]').click()

        cy.visit('http://localhost:3000/cadastro-usuarios')
        cy.get('[name="email"]').type(`test${number}@email`)
        cy.get('[name="name"]').type("Test Name")
        cy.get('[name="pwd"]').type("Secret2")
        cy.get('[name="pwdconfirm"]').type("Secret2")
        cy.get('[name="button"]').click()
    })
    it('should fail bc created user w invalid email [no @]', () => {
        cy.visit('http://localhost:3000')
        cy.get('[name="email"]').type("maria@email.com")
        cy.get('[name="pwd"]').type("segredo")
        cy.get('[name="button"]').click()

        cy.visit('http://localhost:3000/cadastro-usuarios')
        cy.get('[name="email"]').type(`test${number}@.com`)
        cy.get('[name="name"]').type("Test Name")
        cy.get('[name="pwd"]').type("Secret2")
        cy.get('[name="pwdconfirm"]').type("Secret2")
        cy.get('[name="button"]').click()
    })
    it('should fail bc created user w invalid email [no word before @]', () => {
        cy.visit('http://localhost:3000')
        cy.get('[name="email"]').type("maria@email.com")
        cy.get('[name="pwd"]').type("segredo")
        cy.get('[name="button"]').click()

        cy.visit('http://localhost:3000/cadastro-usuarios')
        cy.get('[name="email"]').type(`@email.com`)
        cy.get('[name="name"]').type("Test Name")
        cy.get('[name="pwd"]').type("Secret2")
        cy.get('[name="pwdconfirm"]').type("Secret2")
        cy.get('[name="button"]').click()
    })

    // name validations
    it('should fail bc created user w only one name', () => {
        cy.visit('http://localhost:3000')
        cy.get('[name="email"]').type("maria@email.com")
        cy.get('[name="pwd"]').type("segredo")
        cy.get('[name="button"]').click()

        cy.visit('http://localhost:3000/cadastro-usuarios')
        cy.get('[name="email"]').type(`test${number}@email.com`)
        cy.get('[name="name"]').type("Test")
        cy.get('[name="pwd"]').type("Secret2")
        cy.get('[name="pwdconfirm"]').type("Secret2")
        cy.get('[name="button"]').click()
    })

    // pwd validations
    it('should fail bc created user w password length shorter than 6 digits', () => {
        cy.visit('http://localhost:3000')
        cy.get('[name="email"]').type("maria@email.com")
        cy.get('[name="pwd"]').type("segredo")
        cy.get('[name="button"]').click()

        cy.visit('http://localhost:3000/cadastro-usuarios')
        cy.get('[name="email"]').type(`test${number}@email.com`)
        cy.get('[name="name"]').type("Test Name")
        cy.get('[name="pwd"]').type("12345")
        cy.get('[name="pwdconfirm"]').type("12345")
        cy.get('[name="button"]').click()
    })
    it('should fail bc created user w passwords dont match', () => {
        cy.visit('http://localhost:3000')
        cy.get('[name="email"]').type("maria@email.com")
        cy.get('[name="pwd"]').type("segredo")
        cy.get('[name="button"]').click()

        cy.visit('http://localhost:3000/cadastro-usuarios')
        cy.get('[name="email"]').type(`test${number}@email.com`)
        cy.get('[name="name"]').type("Test Name")
        cy.get('[name="pwd"]').type("123456")
        cy.get('[name="pwdconfirm"]').type("1234567")
        cy.get('[name="button"]').click()
    })
})