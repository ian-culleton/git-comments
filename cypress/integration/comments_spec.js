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

  beforeEach(function(){
    // **** Resetting State Before Each Test ****
    //
    // Visiting our app before each test
    // removes any state build up from
    // previous tests. Visiting acts as if
    // we closed a tab and opened a fresh one
    //
    // By default Cypress also automatically
    // clears the Local Storage and Cookies
    // before each test.
  })

  it('cy.should - assert that <title> is correct', function(){

    // https://on.cypress.io/api/visit
    cy.visit('http://127.0.0.1:3000/');

    // **** Making Assertions ****
    //
    // Here we've made our first assertion using a 'cy.should()' command.
    // An assertion is comprised of a chainer, subject, and optional value.
    // Chainers are available from Chai, Chai-jQuery, and Chai-Sinon.
    // https://on.cypress.io/guides/making-assertions
    //
    // https://on.cypress.io/api/should
    // https://on.cypress.io/api/and

    // https://on.cypress.io/api/title
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

    it('Validate Form', function(){

      // https://on.cypress.io/api/get
      // We can get DOM elements by id
      cy.get('#commentForm')
        .should('be.visible')
        .within(function() {
          cy
            .get('#username').should('be.visible')
            .get('#repoName').should('be.visible')
            .get('#repoURL').should('be.visible')
            .get('button:first').should('be.visible')
        })

      // We can get DOM elements by class
      //cy.get('.query-btn').should('contain', 'Button')

      //cy.get('#querying .well>button:first').should('contain', 'Button')
      //              ↲
      // we can CSS selectors just like jQuery
    })

    //it('cy.contains() - query DOM elements with matching content', function(){

  })
})
