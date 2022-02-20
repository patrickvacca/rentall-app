describe('Edit a Task', () => {
    it('Visit Rentall Challenge App', () => {
        cy.visit('http://localhost:3000/')

        cy.get('.MuiListItemButton-root').eq(7).click()
        cy.get('#task-title').type('TestTitle')
        cy.get('#task-description').type('TestDescription')
        cy.get('.MuiButton-root').eq(0).click()
        cy.get('#app-snackbar').contains('Task successfully updated!')
        cy.contains('TestTitle - TestDescription | 2022-02-20')
    })
});