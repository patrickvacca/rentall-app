describe('Check a Task', () => {
    it('Visit Rentall Challenge App', () => {
        cy.visit('http://localhost:3000/')

        cy.get(':nth-child(1) > .MuiListItem-root > .css-cvhtoe-MuiButtonBase-root-MuiListItemButton-root > .MuiListItemIcon-root > .MuiCheckbox-root > .PrivateSwitchBase-input').click()
        cy.get('.MuiListItemText-root.css-tlelie-MuiListItemText-root').eq(0).should('have.css', 'text-decoration', 'line-through solid rgba(0, 0, 0, 0.87)')
    })
});

describe('Uncheck a Task', () => {
    it('Visit Rentall Challenge App', () => {
        cy.visit('http://localhost:3000/')

        cy.get('.MuiListItemIcon-root.css-cveggr-MuiListItemIcon-root').eq(0).click()
        cy.get('.MuiListItemIcon-root.css-cveggr-MuiListItemIcon-root').eq(0).click()
        cy.get('.MuiListItemText-root.css-tlelie-MuiListItemText-root').eq(0).should('have.css', 'text-decoration', 'none solid rgba(0, 0, 0, 0.87)')
    })
});