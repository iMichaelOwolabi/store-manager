import request from 'supertest';

import app from '../src/app';

// Test get all users endpoint
describe('GET /users', () => {
  it('respond with json containing a list of all users', (done) => {
    request(app)
      .get('/api/v1/users')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});

// Test to get a specific user endpoint
describe('GET /user/:id', () => {
  it('respond with json containing a single user', (done) => {
    request(app)
      .get('/api/v1/users/1')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});

// Testing error 404 on users endpoint
describe('GET /user/:id', () => {
  it('respond with json user not found', (done) => {
    request(app)
      .get('/api/v1/users/0')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404)
      .expect('"The specified user does not exist on this platform"')
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });
});

// Test to Post on users endpoint
describe('POST /users', () => {
  const dummyData = {
    id: 1,
    username: 'dummyUser',
    password: 'dummyPass',
    role: 'dummyRole',
  };
  it('respond with 201 created', (done) => {
    request(app)
      .post('/api/v1/users')
      .send(dummyData)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });
});

// Test to PUT/Update on users endpoint
describe('PUT /users/:id', () => {
  const dummyData = {
    id: 1,
    username: 'dummyUser',
    password: 'dummyPass',
    role: 'dummyRole',
  };
  it('respond with 201 created', (done) => {
    request(app)
      .put('/api/v1/users/1')
      .send(dummyData)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });
});

/** **************************Tests for products endpoints******************************************** */

// Test to get all products endpoint
describe('GET /products', () => {
  it('respond with json containing a list of all products', (done) => {
    request(app)
      .get('/api/v1/products')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});

// Test to get a specific product endpoint
describe('GET /products/:id', () => {
  it('respond with json containing a single product', (done) => {
    request(app)
      .get('/api/v1/products/1')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});

// Testing error 404 on products endpoint
describe('GET /products/:id', () => {
  it('respond with json product not found', (done) => {
    request(app)
      .get('/api/v1/products/0')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404)
      .expect('"The specified product does not exist on this platform"')
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });
});

// Test to Post on products endpoint
describe('POST /products', () => {
  const dummyData = {
    id: 1,
    dummyProductName: 'dummyProductName',
    dummyProductPrice: 70,
    dummyCategory: 'Shoes',
    dummyProductQuantity: 17000,

  };
  it('respond with 201 created', (done) => {
    request(app)
      .post('/api/v1/products')
      .send(dummyData)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });
});

// Test to PUT/Update on products endpoint
describe('PUT /products/:id', () => {
  const dummyData = {
    id: 1,
    username: 'dummyUser',
    password: 'dummyPass',
    role: 'dummyRole',
  };
  it('respond with 201 created', (done) => {
    request(app)
      .put('/api/v1/products/1')
      .send(dummyData)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });
});

// Test to delete on products endpoint
describe('DELETE /products/:id', () => {
  it('respond with 204 deleted after completion', (done) => {
    request(app)
      .delete('/api/v1/products/1')
      .expect(204)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });
});

/** *******************************Tests for sales endpoints*************************************** */

// Test to get all sales endpoint
describe('GET /sales', () => {
  it('respond with json containing a list of all sales record', (done) => {
    request(app)
      .get('/api/v1/sales')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});

// Test to get a specific sales endpoint
describe('GET /sales/:id', () => {
  it('respond with json containing a single sales record', (done) => {
    request(app)
      .get('/api/v1/sales/1')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});

// Testing error 404 on sales endpoint
describe('GET /sales/:id', () => {
  it('respond with json sales record not found', (done) => {
    request(app)
      .get('/api/v1/sales/0')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404)
      .expect('"The specified sales record does not exist on this platform"')
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });
});

// Test to Post on sales endpoint
describe('POST /sales', () => {
  const dummyData = {
    id: 1,
    dummyProductName: 'dummyProductName',
    dummyProductPrice: 70,
    dummyCategory: 'Shoes',
    dummyProductQuantity: 17000,
    dummyAttendantId: 'user3',
  };
  it('respond with 201 sales record created', (done) => {
    request(app)
      .post('/api/v1/sales')
      .send(dummyData)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });
});