describe('template spec', () => {
  it('Home page returns 200 response', () => {
    cy.request('https://rx-devtest.com/').then((response) => {
      expect(response.status).to.eq(200)
    })
  })

  it('Login positive', () => {
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

    cy.get('a[href*="#/login"]').click()

    cy.get('input[placeholder*="Email"]')
    .type('nate650+' + timestamp + '@hotmail.com')
    .type("{enter}")

    cy.get('input[placeholder*="Password"]')
    .type('t3st1ngrxmg')
    .type("{enter}")

    // Verify redirect after successful login and username registered with is present in header
    cy.url().should('eq', 'https://rx-devtest.com/#/')
    cy.get('.user-pic').should('have.attr', 'alt', timestamp)
  })

  it('Login negative due to incorrect password', () => {
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

    cy.get('a[href*="#/login"]').click()

    cy.get('input[placeholder*="Email"]')
    .type('nate650+' + timestamp + '@hotmail.com')
    .type("{enter}")

    cy.get('input[placeholder*="Password"]')
    .type('wrongpassword')
    .type("{enter}")

    // The error message on the site says "email is not found", but the actual reason is an incorrect password
    cy.get('.error-messages').contains('email is not found')
  })
})