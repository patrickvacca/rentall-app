describe('Check a Task', () => {
    it('Visit Rentall Challenge App', () => {
        cy.visit('http://localhost:3000/')

        cy.get('.MuiListItemIcon-root.css-cveggr-MuiListItemIcon-root').eq(0).click()
        cy.get('#app-snackbar').contains('Task successfully updated!')
        cy.get('.MuiListItemText-root.css-tlelie-MuiListItemText-root').eq(0).should('have.css', 'text-decoration', 'line-through solid rgba(0, 0, 0, 0.87)')
        cy.get('.MuiListItemIcon-root.css-cveggr-MuiListItemIcon-root').eq(0).click({ force: true })
    })
});

describe('Uncheck a Task', () => {
    it('Visit Rentall Challenge App', () => {
        cy.visit('http://localhost:3000/')

        cy.get('.MuiListItemIcon-root.css-cveggr-MuiListItemIcon-root').eq(0).click({ force: true })
        cy.get('.MuiListItemIcon-root.css-cveggr-MuiListItemIcon-root').eq(0).click()
        cy.get('#app-snackbar').contains('Task successfully updated!')
        cy.get('.MuiListItemText-root.css-tlelie-MuiListItemText-root').should('have.css', 'text-decoration', 'none solid rgba(0, 0, 0, 0.87)')
    })
});