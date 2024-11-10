jest.setTimeout(10000); // Set a longer timeout for the test file

const request = require('supertest');
const { execSync } = require('child_process'); // Import execSync

describe('POST /book', () => {
  let token;

  beforeAll(async () => {
    
    const loginResponse = await request('http://localhost:4000')
      .post('/api/user/login')
      .send({
        username: 'user',
        password: 'user',
      });

    if (!loginResponse.body.token) {
      throw new Error("Failed to retrieve token");
    }

    token = loginResponse.body.token;
  });

  it('should post the book if authenticated', async () => {
    const response = await request('http://localhost:4000')
      .post('/api/book')
      .send({
        title: 'novo livro adicionado',
        isbn: '123456',
        token: token,
      });

    expect(response.status).toBe(201);
  });
  
  it('should not post the book if token', async () => {
    const response = await request('http://localhost:4000')
      .post('/api/book')
      .send({
        title: 'novo livro adicionado',
        isbn: '123456',
        token:'invalidtoken',
      });

    expect(response.status).toBe(500);
  });
  
});
