describe('blog app', function() {

  beforeEach(function() {

    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      username: 'user1',
      password: 'pass',
      name: 'kjartan'
    }

    cy.request('POST', 'http://localhost:3003/api/users', user)

    cy.visit('http://localhost:3000')
  })

  it('frontpage can be opened', function() {
    cy.contains('blogs')
  })

  it('login form can be opened and suer logs in', function() {
    cy.contains('Login').click()
    cy.get('#username').type('user1')
    cy.get('#password').type('pass')
    cy.get('#login-button').click()

    cy.contains('kjartan is logged in')
  })

  it('login fails with the wrong credentials', function() {
    cy.contains('Login').click()
    cy.get('#username').type('user1')
    cy.get('#password').type('wrong')
    cy.get('#login-button').click()

    cy.get('.error').should('contain','username or password incorrrect')
  })

  describe('when loged in', function() {
    beforeEach(function() {
      cy.login({username: 'user1', password: 'pass'})
    })

    it('a new blog can be created', function() {
      cy.contains('New blog').click()
      cy.get('#title').type('new test blog')
      cy.get('#url').type('new test url')
      cy.get('#submit-new-blog').click()

      cy.contains('new test blog')
    })

    describe('and a few blog exist', function() {
      beforeEach(function() {
        cy.createBlog({ title: 'new test blog 1', url : 'new test url' , author: 'kjartan'})
        cy.createBlog({ title: 'new test blog 2', url : 'new test url' , author: 'kjartan'})
        cy.createBlog({ title: 'new test blog 3', url : 'new test url' , author: 'kjartan'})
      })

      it('one of them can be liked', function() {
        cy.contains('new test blog 2').contains('Show').click()
        cy.contains('like').click()
        cy.contains('Likes 1')

        cy.get('.blog:first-child').should('contain', 'new test blog 2')
      })

      it('owner of the blog can delete it', function() {
        cy.contains('new test blog 2').contains('Show').click()
        cy.contains('Remove').click()

        cy.get('.blog-list').should('not.contain', 'new test blog 2')
      })

      it('user that does not own a blog can not delete it', function() {
        const user = {
          username: 'user2',
          password: 'pass2',
          name: 'Anna'
        }

        cy.request('POST', 'http://localhost:3003/api/users', user)

        cy.contains('Logout').click()
        cy.contains('Login').click()
        cy.get('#username').type('user2')
        cy.get('#password').type('pass2')
        cy.get('#login-button').click()

        cy.get('.blog:first-child').contains('Show').click()
        cy.get('.blog:first-child').should('not.contain', 'Remove')
       
      })

      it('blogs are ordered by likes', function() {
        cy.createBlog({ title: 'new test blog 4', url : 'new test url' , author: 'kjartan', likes: 20})
        cy.createBlog({ title: 'new test blog 5', url : 'new test url' , author: 'kjartan', likes: 50})

        cy.get('.blog').eq(0).should('contain', 'new test blog 5')
        cy.get('.blog').eq(1).should('contain', 'new test blog 4')

       
      })
    })
  })

})