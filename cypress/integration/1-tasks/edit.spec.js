describe('Edit a Task', () => {
    it('Visit Rentall Challenge App', () => {
        cy.visit('http://localhost:3000/')

        // setup
        cy.get('#taskbar-add-button').click()
        cy.get('#task-title').type('cypress_edit_title')
        cy.get('#task-description').type('cypress_edit_description')
        cy.get('.MuiSelect-select').click()
        cy.get('.MuiList-root > [tabindex="-1"]').click()
        cy.get('.MuiButton-root').eq(0).click()
        cy.get('#app-snackbar').contains('Task successfully created!')
        cy.contains('cypress_edit_title - cypress_edit_description | 2022-02-21')

        cy.wait(1000)
        cy.get('.MuiListItemButton-root').eq(10).click()
        cy.get('#task-title').type('TestTitle')
        cy.get('#task-description').type('TestDescription')
        cy.get('.MuiSelect-select').click()
        cy.get('.MuiList-root > [tabindex="0"]').click()
        cy.get('.MuiButton-root').eq(0).click()
        cy.get('#app-snackbar').contains('Task successfully updated!')
        cy.contains('TestTitle - TestDescription | 2022-02-21')

        // cleanup
        cy.wait(1000)
        cy.get('.MuiListItemButton-root').eq(11).click()
        cy.get('.MuiButton-root').eq(1).click()
        cy.get('#app-snackbar').contains('Task successfully deleted!')
        cy.get('.MuiListItemButton-root').eq(9).should('not.exist')
    })
});