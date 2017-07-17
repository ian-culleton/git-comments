//
// **** Kitchen Sink Tests ****
//
// This app was developed to demonstrate
// how to write tests in Cypress utilizing
// all of the available commands
//
// Feel free to modify this spec in your
// own application as a jumping off point

// **** Test Structure ****
//
// Cypress has adopted Mocha's bdd syntax.
// https://on.cypress.io/guides/bundled-tools#section-mocha
//

describe('GitHub comments lister', function(){
  const testURL = 'http://127.0.0.1:3000/';
  beforeEach(function(){
    // **** Resetting State Before Each Test ****

  })

  it('cy.should - assert that <title> is correct', function(){

    // https://on.cypress.io/api/visit
    cy.visit(testURL);

    cy.title().should('include', 'GitHub Comments Lister');
    //   ↲               ↲            ↲
    // subject        chainer      value
  })

  context('Form', function(){
    beforeEach(function(){
      cy.visit('http://127.0.0.1:3000/')
    })

    // **** Querying DOM Elements ****
    //
    // Let's query for some DOM elements and make assertions
    // The most commonly used query is 'cy.get()', you can
    // think of this like the '$' in jQuery

    it('Verify Form Fields', function(){

      // http://127.0.0.1:3000/
      // We can get DOM elements by id
      cy.get('#commentForm')
        .should('be.visible')
        .within(function() {
          cy
            .get('#repoURL').should('be.visible')
            .get('button:first').should('be.visible')
        })
    })

    it('Reject Empty URL', function(){
      cy
        .get('#repoURL')
        .type('not a url', {delay: 100})
      cy
        .get('#commentFormSubmit')
        .click()
        .get('.mdc-ripple-upgraded--foreground-activation').should('be.visible');
    })

    it('Reject Bad URL', function(){
      cy
        .get('#repoURL')
        .type('https://www.google.com', {delay: 100})
      cy
        .get('#commentFormSubmit')
        .click()
        .get('.mdc-ripple-upgraded--foreground-activation').should('be.visible');
    })

    it('Accept Good URL', function(){
      cy
        .get('#repoURL')
        .type('https://github.com/jmichelin/interview-helper', {delay: 100})
      cy
        .get('#commentFormSubmit')
        .click()
        .get('p:first').should('contain', 'Welcome to Comments');
    })

  })
})
