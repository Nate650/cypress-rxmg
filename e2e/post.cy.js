describe('template spec', () => {
  it('Home page returns 200 response', () => {
    cy.request('https://rx-devtest.com/').then((response) => {
      expect(response.status).to.eq(200)
    })
  })

  it('Post positive', () => {
    cy.visit('https://rx-devtest.com/')

    cy.get('a[href*="#/login"]').click()

    cy.get('input[placeholder*="Email"]')
    .type('nate650+3@hotmail.com')
    .type("{enter}")

    cy.get('input[placeholder*="Password"]')
    .type('t3st1ngrxmg')
    .type("{enter}")

    cy.get('a[href*="#/editor"]').click()

    cy.get('input[placeholder*="Article Title"]')
    .type('Article Title Test')
    .type("{enter}")

    cy.get('input[placeholder*="What\'s this article about?"]')
    .type("What's this article about? test")
    .type("{enter}")

    cy.get('textarea[placeholder*="Write your article (in markdown)"]')
    .type('Write your article (in markdown) test')
    .type("{enter}")

    cy.get('button[type*="button"]').contains('Publish Article').click()

    cy.get('a[href*="#/"]').contains('Home').click()
    cy.get('.nav-link').contains('Global Feed').click()

    cy.get('h1').contains('Article Title Test')
  })

  it('Post negative due to required field "Article Title" not populated', () => {
    cy.visit('https://rx-devtest.com/')

    cy.get('a[href*="#/login"]').click()

    cy.get('input[placeholder*="Email"]')
    .type('nate650+3@hotmail.com')
    .type("{enter}")

    cy.get('input[placeholder*="Password"]')
    .type('t3st1ngrxmg')
    .type("{enter}")

    cy.get('a[href*="#/editor"]').click()

    cy.get('input[placeholder*="What\'s this article about?"]')
    .type("What's this article about? test")
    .type("{enter}")

    cy.get('textarea[placeholder*="Write your article (in markdown)"]')
    .type('Write your article (in markdown) test')
    .type("{enter}")

    cy.get('button[type*="button"]').contains('Publish Article').click()

    // Verify user remains on editor page since article publishing is expected to fail for this test
    cy.get('.editor-page')
  })
})