describe('Cancel Create a Task', () => {
    it('Visit Rentall Challenge App', () => {
        cy.visit('http://localhost:3000/')

        cy.get('#taskbar-add-button').click()
        cy.get('.MuiButton-root').eq(1).click()
    })
});

describe('Create a Task', () => {
    it('Visit Rentall Challenge App', () => {
        cy.visit('http://localhost:3000/')

        cy.get('#taskbar-add-button').click()
        cy.get('#task-title').type('TestTitle')
        cy.get('#task-description').type('TestDescription')
        cy.get('.MuiSelect-select').click()
        cy.get('.MuiList-root > [tabindex="0"]').click()
        cy.get('.MuiButton-textPrimary').click({ force: true })
        cy.get('#app-snackbar').contains('Task successfully created!')
        cy.contains('TestTitle - TestDescription | 2022-02-21')
    })
});