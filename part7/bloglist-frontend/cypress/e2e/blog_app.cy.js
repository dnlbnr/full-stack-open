const user = {
  username: 'TestUser',
  password: '123',
  name: 'Max Mustermann',
};

const existingBlog = {
  title: 'Existing Blog',
  author: 'Existing Author',
  url: 'Existing.de',
};

const newBlog = {
  title: 'TestBlog',
  author: 'Test Author',
  url: 'Test.de',
};

describe('Blog app', () => {
  beforeEach(() => {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    cy.request('POST', 'http://localhost:3003/api/users', user);
    cy.visit('http://localhost:3000');
  });

  it('Login form is shown', () => {
    cy.contains('Login');
    cy.get('input[name="username"]');
    cy.get('input[name="password"]');
  });

  describe('Login', () => {
    it('succeeds with correct credentials', () => {
      cy.contains('Login');
      cy.get('input[name="username"]').type(user.username);
      cy.get('input[name="password"]').type(user.password);
      cy.get('button[type="submit"]').click();

      cy.contains(`Logged in user: ${user.username}`);
    });

    it('fails with wrong credentials', () => {
      cy.contains('Login');
      cy.get('input[name="username"]').type('123');
      cy.get('input[name="password"]').type('123');
      cy.get('button[type="submit"]').click();

      cy.contains('Wrong username or password');
    });
  });

  describe('When logged in', () => {
    beforeEach(() => {
      const { username, password } = user;
      cy.request('POST', 'http://localhost:3003/api/login', { username, password })
        .then((response) => {
          localStorage.setItem('loggedInUser', JSON.stringify(response.body));
          const options = {
            method: 'POST',
            auth: { bearer: response.body.token },
            url: 'http://localhost:3003/api/blogs',
            body: existingBlog,
          };
          return cy.request(options);
        })
        .then(() => {
          cy.visit('http://localhost:3000');
        });
    });

    it('A blog can be created', () => {
      cy.contains(`Logged in user: ${user.username}`);
      cy.contains(`blogs for ${user.username}`);
      cy.get('button.toggleButton').click();
      cy.get('input[name="title"]').type(newBlog.title);
      cy.get('input[name="author"]').type(newBlog.author);
      cy.get('input[name="url"]').type(newBlog.url);
      cy.get('button[type="submit"]').click();
      cy.contains(newBlog.title);
    });

    it('Users can like a blog', () => {
      cy.get('button.toggleDetailsButton').click();
      cy.get('button.likeButton').click();
      cy.contains('1');
    });

    it('Users can delete blogs', () => {
      cy.get('button.toggleDetailsButton').click();
      cy.get('button.deleteButton').click();
      cy.contains(existingBlog.title).should('not.exist');
    });

    it('Blogs are sorted by their likes', () => {
      const moreLikes = {
        title: 'More likes',
        author: 'Better Author',
        url: 'test.de',
        likes: 3,
      };
      const authToken = JSON.parse(localStorage.getItem('loggedInUser')).token;
      const options = {
        method: 'POST',
        auth: { bearer: authToken },
        url: 'http://localhost:3003/api/blogs',
        body: moreLikes,
      };
      cy.request(options);
      cy.visit('http://localhost:3000');
      cy.get('.blog').eq(0).should('contain', moreLikes.title);
      cy.get('.blog').eq(1).should('contain', existingBlog.title);
    });
  });
});
