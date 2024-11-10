jest.setTimeout(10000); 

const request = require('supertest');

const oldbook = {
  title: "new title",
  isbn: "13i3313",
};

const newbook = {
  title: "new title for the old book",
  isbn: "13i3313",
};


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
        title: oldbook.title,
        isbn: oldbook.isbn,
        token: token,
      });

    expect(response.status).toBe(201);
  });
  
  it('should not post the book if token', async () => {
    const response = await request('http://localhost:4000')
      .post('/api/book')
      .send({
        title: oldbook.title,
        isbn: oldbook.isbn,
        token:'invalidtoken',
      });

    expect(response.status).toBe(500);
  });
  
});



describe('UPDATE /book', () => {
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

  it('should update the book if authenticated', async () => {

    const put_response = await request('http://localhost:4000')
      .put('/api/book')
      .send({
        title: newbook.title,
        targettitle: oldbook.title,
        isbn: newbook.isbn,
        token: token,
      });

    expect(put_response.status).toBe(201);


    const get_response = await request('http://localhost:4000')
      .get('/api/book/title/'+ newbook.title);

    expect(get_response.status).toBe(201);
    expect(get_response.body.title).toBe( newbook.title);

  });
  
  it('should not get book that doesnt exist', async () => {
    const response = await request('http://localhost:4000')
      .get('/api/book/title/snaldkfnskdasdfanskldfnaf')

    expect(response.body.title).toBe(undefined);
    expect(response.body.isbn).toBe(undefined);
    expect(response.body.id).toBe(undefined);

  });
  
});



describe('delete /book', () => {
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

  it('should delete the book if authenticated', async () => {
    const response = await request('http://localhost:4000')
      .delete('/api/book')
      .send({
        title: newbook.title,
        token: token,
      });

    expect(response.status).toBe(201);
  });
  
  it('should not delete the book if token', async () => {
    const response = await request('http://localhost:4000')
      .delete('/api/book')
      .send({
        title: oldbook.title,
        token:'invalidtoken',
      });

    expect(response.status).toBe(500);
  });
  
});


