describe('Create a Category', () => {
    it('Visit Rentall Challenge App', () => {
        cy.visit('http://localhost:3000/')

        cy.get('.MuiButton-root').click()
        cy.get('#category-title').type('test_category')
        cy.get('.MuiButton-textPrimary').click({ force: true })
        cy.get('#app-snackbar').contains('Category successfully created!')

        cy.get('#taskbar-add-button').click()
        cy.get('.MuiSelect-select').click()
        cy.get('[data-value="test_category"]').should('exist')
    })
});