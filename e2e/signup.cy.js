describe('template spec', () => {
  it('Home page returns 200 response', () => {
    cy.request('https://rx-devtest.com/').then((response) => {
      expect(response.status).to.eq(200)
    })
  })

  it('Signup positive', () => {
    cy.visit('https://rx-devtest.com/')

    cy.get('a[href*="#/register"]').click()

    var timestamp = new Date().valueOf();  // Create unique username each time test is run

    cy.get('input[placeholder*="Username"]')
    .type(timestamp)
    .type("{enter}")

    cy.get('input[placeholder*="Email"]')
    .type('nate650+' + timestamp + '@hotmail.com')
    .type("{enter}")

    cy.get('input[placeholder*="Password"]')
    .type('t3st1ngrxmg')
    .type("{enter}")

    // Verify username registered with is present in header
    cy.get('.user-pic').should('have.attr', 'alt', timestamp)
  })

  it('Signup negative due to already existing username', () => {
    cy.visit('https://rx-devtest.com/')

    cy.get('a[href*="#/register"]').click()

    var timestamp = new Date().valueOf();  // Create unique username each time test is run

    cy.get('input[placeholder*="Username"]')
    .type(timestamp)
    .type("{enter}")

    cy.get('input[placeholder*="Email"]')
    .type('nate650+' + timestamp + '@hotmail.com')
    .type("{enter}")

    cy.get('input[placeholder*="Password"]')
    .type('t3st1ngrxmg')
    .type("{enter}")

    cy.get('a[href*="#/settings"]').click()
    cy.contains('Or click here to logout.').click()

    cy.get('a[href*="#/register"]').click()

    cy.get('input[placeholder*="Username"]')
    .type(timestamp)
    .type("{enter}")

    cy.get('input[placeholder*="Email"]')
    .type('nate650+' + timestamp + '@hotmail.com')
    .type("{enter}")

    cy.get('input[placeholder*="Password"]')
    .type('t3st1ngrxmg')
    .type("{enter}")

    cy.get('.error-messages').contains('username is exist')
  })
})