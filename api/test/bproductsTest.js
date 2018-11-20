import '@babel/polyfill';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app';

let authentication;

const { expect } = chai;

chai.use(chaiHttp);

const loginCredentials = {
  username: 'admin',
  password: 'admin1*',
};

const wrongCredentials = {
  username: 'wrongusername',
  password: 'wrongpassword',
};

let dummyProduct;

describe('POST /api/v1/auth/login', () => {
  it('shoulg not login with wrong credentials', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send(wrongCredentials)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal('Incorrect credentials');
        if (err) return done(err);
        done();
      });
  });
});

describe('POST /api/v1/auth/login', () => {
  it('should successfully log-in user with the correct credentials', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send(loginCredentials)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.success).to.equal(true);
        expect(res.body.message).to.equal('You are welcome to the store manager');
        authentication = res.body.token;
        if (err) return done(err);
        done();
      });
  });
});

describe('HTTP methods on /api/v1/products', () => {
  it('should not process GET request without authentication token', (done) => {
    chai.request(app)
      .get('/api/v1/products')
      .end((err, res) => {
        expect(res.status).to.equal(401);
        expect(res.body.success).to.equal(false);
        if (err) return done(err);
        done();
      });
  });

  it('should not process GET request with invalid token', (done) => {
    chai.request(app)
      .get('/api/v1/products')
      .set('x-access-token', 'invalidToken')
      .end((err, res) => {
        expect(res.status).to.equal(400);
        if (err) return done(err);
        done();
      });
  });

  it('should respond with json containing a list of all products', (done) => {
    chai.request(app)
      .get('/api/v1/products')
      .set('x-access-token', authentication)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.success).to.equal(true);
        if (err) return done(err);
        done();
      });
  });

  it('should not get a product that does not exist', (done) => {
    chai.request(app)
      .get('/api/v1/products/98745')
      .set('x-access-token', authentication)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal('product not found');
        if (err) return done(err);
        done();
      });
  });

  it('should get a product that exists', (done) => {
    chai.request(app)
      .get('/api/v1/products/1')
      .set('x-access-token', authentication)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.success).to.equal(true);
        expect(res.body.message).to.equal('the product');
        if (err) return done(err);
        done();
      });
  });

  it('should not process POST request without authentication token', (done) => {
    dummyProduct = {
      productName: 'Men\'s Boot',
      price: 400,
      quantity: 5,
      productImage: 'imageURL',
    };
    chai.request(app)
      .post('/api/v1/products')
      .send(dummyProduct)
      .set('x-access-token', '')
      .end((err, res) => {
        expect(res.status).to.equal(401);
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal('Unauthorized User');
        if (err) return done(err);
        done();
      });
  });

  it('should not process POST requests with invalid token', (done) => {
    dummyProduct = {
      productName: 'Men\'s Boot',
      price: 400,
      quantity: 5,
      productImage: 'imageURL',
    };
    chai.request(app)
      .post('/api/v1/products')
      .send(dummyProduct)
      .set('x-access-token', 'invalidToken')
      .end((err, res) => {
        expect(res.status).to.equal(400);
        if (err) return done(err);
        done();
      });
  });

  it('should not create a product without all required fields', (done) => {
    dummyProduct = {
      productName: 'Men\'s Boot',
      price: 400,
      quantity: 5,
      productImage: '',
    };
    chai.request(app)
      .post('/api/v1/products')
      .send(dummyProduct)
      .set('x-access-token', authentication)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal('all fields are required');
        if (err) return done(err);
        done();
      });
  });

  it('should successfully create a product with the right access and credentials', (done) => {
    dummyProduct = {
      productName: 'Men\'s Boot',
      price: 400,
      quantity: 5,
      productImage: 'https://imageurl.com.image1.jpg',
    };
    chai.request(app)
      .post('/api/v1/products')
      .send(dummyProduct)
      .set('x-access-token', authentication)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.success).to.equal(true);
        expect(res.body.message).to.equal('product successfully added');
        if (err) return done(err);
        done();
      });
  });

  it('should not process update request without authentication token', (done) => {
    dummyProduct = {
      productName: 'Men\'s Boot',
      price: 400,
      quantity: 82,
      productImage: 'imageURL',
    };
    chai.request(app)
      .put('/api/v1/products/2')
      .send(dummyProduct)
      .set('x-access-token', '')
      .end((err, res) => {
        expect(res.status).to.equal(401);
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal('Unauthorized User');
        if (err) return done(err);
        done();
      });
  });


  it('should not update a product that does not exit', (done) => {
    dummyProduct = {
      productName: 'Men\'s Boot',
      price: 400,
      quantity: 82,
      productImage: 'https://imageurl.com.image1.png',
    };
    chai.request(app)
      .put('/api/v1/products/98745')
      .send(dummyProduct)
      .set('x-access-token', authentication)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal('product not found');
        if (err) return done(err);
        done();
      });
  });

  it('should update an existing product with the right authorization and credentials', (done) => {
    dummyProduct = {
      productName: 'Men\'s Boot',
      price: 400,
      quantity: 82,
      productImage: 'https://imageurl.com.image1.png',
    };
    chai.request(app)
      .put('/api/v1/products/2')
      .send(dummyProduct)
      .set('x-access-token', authentication)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.success).to.equal(true);
        expect(res.body.message).to.equal('product updated successfully');
        if (err) return done(err);
        done();
      });
  });

  it('should not process delete request without authentication token', (done) => {
    chai.request(app)
      .delete('/api/v1/products/2')
      .end((err, res) => {
        expect(res.status).to.equal(401);
        expect(res.body.success).to.equal(false);
        if (err) return done(err);
        done();
      });
  });

  it('should not process delete request with invalid token', (done) => {
    chai.request(app)
      .delete('/api/v1/products/2')
      .set('x-access-token', 'invalidToken')
      .end((err, res) => {
        expect(res.status).to.equal(400);
        if (err) return done(err);
        done();
      });
  });

  it('should not delete a product that does not exist', (done) => {
    chai.request(app)
      .delete('/api/v1/products/98745')
      .set('x-access-token', authentication)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal('product not found');
        if (err) return done(err);
        done();
      });
  });

  it('should delete an existing product with the right authorization and credentials', (done) => {
    chai.request(app)
      .delete('/api/v1/products/2')
      .set('x-access-token', authentication)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.success).to.equal(true);
        expect(res.body.message).to.equal('product successfully deleted');
        if (err) return done(err);
        done();
      });
  });
});
