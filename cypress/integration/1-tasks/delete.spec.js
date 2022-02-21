describe('Cancel Deleting a Task', () => {
    it('Visit Rentall Challenge App', () => {
        cy.visit('http://localhost:3000/')

        cy.get(':nth-child(1) > .MuiListItem-root > .MuiGrid-container > :nth-child(4)').click()
        cy.get('.MuiButton-textPrimary').click()
        cy.get('.MuiListItemButton-root').eq(0).contains('abc - def | 2020-01-01')
    })
});

describe('Delete a Task', () => {
    it('Visit Rentall Challenge App', () => {
        cy.visit('http://localhost:3000/')

        cy.get(':nth-child(4) > .MuiListItem-root > .MuiGrid-container > :nth-child(4)').click()
        cy.get('.MuiButton-textError').click()
        cy.get('#app-snackbar').contains('Task successfully deleted!')
        cy.get(':nth-child(4) > .MuiListItem-root > .MuiGrid-container > :nth-child(4)').should('not.exist')
    })
});