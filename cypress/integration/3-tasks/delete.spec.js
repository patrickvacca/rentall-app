describe('Cancel Deleting a Task', () => {
    it('Visit Rentall Challenge App', () => {
        cy.visit('http://localhost:3000/')

        cy.get('.MuiListItemButton-root').eq(1).click()
        cy.get('.MuiButton-root').eq(0).click()
        cy.get('.MuiListItemButton-root').eq(0).contains('abc - def | 2020-01-01')
    })
});

describe('Delete a Task', () => {
    it('Visit Rentall Challenge App', () => {
        cy.visit('http://localhost:3000/')

        cy.get('.MuiListItemButton-root').eq(9).click()
        cy.get('.MuiButton-root').eq(1).click()
        cy.get('#app-snackbar').contains('Task successfully deleted!')
        cy.get('.MuiListItemButton-root').eq(9).should('not.exist')
    })
});