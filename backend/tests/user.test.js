jest.setTimeout(10000); 

const request = require('supertest');

const olduser = {
  name:"new user",
  username: "newusername",
  email: "newuser@mail.com",
  password: "newuser",
};

const newuser = {
  name:"new user name",
  username: "newusername new",
  email: "newnewuser@mail.com",
  password: "newuser",
};



describe('POST /user', () => {
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

  it('should post new user if authenticated', async () => {
    const response = await request('http://localhost:4000')
      .post('/api/user')
      .send({
        name: olduser.name,
        username: olduser.username,
        password: olduser.password,
        email: olduser.email,
        token: token,
      });

    expect(response.status).toBe(201);
  });
  
  it('should not post the book if token', async () => {
    const response = await request('http://localhost:4000')
      .post('/api/user')
      .send({
        name: newuser.name,
        username: olduser.username,
        password: newuser.password,
        email: newuser.email,
        token:'invalidtoken',
      });

    expect(response.status).toBe(500);
  });
  
});



describe('UPDATE /user', () => {
  
  it('should update user if authenticated', async () => {

    let token;

    const loginResponse = await request('http://localhost:4000')
      .post('/api/user/login')
      .send({
        username: olduser.username,
        password: olduser.password,
      });

    expect(loginResponse.status).toBe(201);
    
    token = loginResponse.body.token;

    const put_response = await request('http://localhost:4000')
      .put('/api/user')
      .send({
        username: olduser.username,
        password: olduser.password,
        name: newuser.name,
        email: newuser.email,
        token: token,
      });

    expect(put_response.status).toBe(201);

  });
  
});



describe('delete user', () => {


  it('should delete the user if authenticated', async () => {

    let token;

    const loginResponse = await request('http://localhost:4000')
      .post('/api/user/login')
      .send({
        username: olduser.username,
        password: olduser.password,
      });

    expect(loginResponse.status).toBe(201);
    
    token = loginResponse.body.token;

    const response = await request('http://localhost:4000')
      .delete('/api/user')
      .send({
        username: olduser.username,
        token: token,
      });

    expect(response.status).toBe(201);

  });
  
  it('should not delete for invalid token', async () => {
    const response = await request('http://localhost:4000')
      .delete('/api/book')
      .send({
        username: olduser.username,
        token:'invalidtoken',
      });

    expect(response.status).toBe(500);
  });
  
});
