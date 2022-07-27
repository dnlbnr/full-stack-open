const user = {
  username: 'TestUser',
  password: '123',
  name: 'Max Mustermann'
}

describe('Blog app', () => {
  beforeEach(() => {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000');
  });

  it('Login form is shown', () => {
    cy.contains('Login')
    cy.get('input[name="username"]')
    cy.get('input[name="password"]')
  });

  describe('Login', () => {
    it('succeeds with correct credentials', () => {
      cy.contains('Login')
      cy.get('input[name="username"]').type(user.username)
      cy.get('input[name="password"]').type(user.password)
      cy.get('button[type="submit]').click()

      cy.contains(`Logged in user: ${user.name}`)
    });

    it('fails with wrong credentials', () => {
      cy.contains('Login')
      cy.get('input[name="username"]').type('123')
      cy.get('input[name="password"]').type('123')
      cy.get('button[type="submit]').click()

      cy.contains('Wrong username or password')
    });
  });
});
