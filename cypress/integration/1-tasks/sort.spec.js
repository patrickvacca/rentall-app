describe('Sort By Date', () => {
    it('Visit Rentall Challenge App', () => {
        cy.visit('http://localhost:3000/')

        cy.get('#radio-date').click()
        cy.get('.MuiList-root > :nth-child(1)').should('have.text', 'category_1abc - def | 2020-01-01')
        cy.get('.MuiList-root > :nth-child(2)').should('have.text', 'category_1ghi - jkl | 2022-02-14')
        cy.get('.MuiList-root > :nth-child(3)').should('have.text', 'category_2def - ghi | 2022-02-21')
    })
});

describe('Sort By Category', () => {
    it('Visit Rentall Challenge App', () => {
        cy.visit('http://localhost:3000/')

        cy.reload()
        cy.get('#radio-category').click()
        cy.get('.MuiList-root > :nth-child(1)').should('have.text', 'category_1abc - def | 2020-01-01')
        cy.get('.MuiList-root > :nth-child(2)').should('have.text', 'category_1ghi - jkl | 2022-02-14')
        cy.get('.MuiList-root > :nth-child(3)').should('have.text', 'category_2def - ghi | 2022-02-21')
    })
});
