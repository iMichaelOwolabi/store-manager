import '@babel/polyfill';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app';

let adminAuthentication;
let userAuthentication;

const { expect } = chai;

chai.use(chaiHttp);

const adminLoginCredentials = {
  username: 'admin',
  password: 'admin1*',
};

const userLoginCredentials = {
  username: 'user3',
  password: 'user3',
};

const wrongCredentials = {
  username: 'wrongusername',
  password: 'wrongpassword',
};

let dummySales;

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
  it('should successfully log-in admin with the correct credentials', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send(adminLoginCredentials)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.success).to.equal(true);
        expect(res.body.message).to.equal('You are welcome to the store manager');
        adminAuthentication = res.body.token;
        if (err) return done(err);
        done();
      });
  });
});

describe('POST /api/v1/auth/login', () => {
  it('should successfully log-in user with the correct credentials', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send(userLoginCredentials)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.success).to.equal(true);
        expect(res.body.message).to.equal('You are welcome to the store manager');
        userAuthentication = res.body.token;
        if (err) return done(err);
        done();
      });
  });
});

describe('HTTP methods on /api/v1/sales', () => {
  it('should not process GET request without authentication token', (done) => {
    chai.request(app)
      .get('/api/v1/sales')
      .end((err, res) => {
        expect(res.status).to.equal(401);
        expect(res.body.success).to.equal(false);
        if (err) return done(err);
        done();
      });
  });

  it('should not process GET request with invalid token', (done) => {
    chai.request(app)
      .get('/api/v1/sales')
      .set('x-access-token', 'invalidToken')
      .end((err, res) => {
        expect(res.status).to.equal(400);
        if (err) return done(err);
        done();
      });
  });

  it('should respond with json containing a list of all sales record', (done) => {
    chai.request(app)
      .get('/api/v1/sales')
      .set('x-access-token', adminAuthentication)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.success).to.equal(true);
        if (err) return done(err);
        done();
      });
  });

  it('should not get a sales record that does not exist', (done) => {
    chai.request(app)
      .get('/api/v1/sales/98745')
      .set('x-access-token', adminAuthentication)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal('sales record not found');
        if (err) return done(err);
        done();
      });
  });

  it('should get a sales record that exists', (done) => {
    chai.request(app)
      .get('/api/v1/sales/1')
      .set('x-access-token', adminAuthentication)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.success).to.equal(true);
        expect(res.body.message).to.equal('specified sales record');
        if (err) return done(err);
        done();
      });
  });

  it('should not process POST request without authentication token', (done) => {
    dummySales = {
      productId: 1,
      quantity: 15,
      amount: 5000,
      userId: 1,
    };
    chai.request(app)
      .post('/api/v1/sales')
      .send(dummySales)
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
    dummySales = {
      productId: 1,
      quantity: 15,
      amount: 5000,
      userId: 1,
    };
    chai.request(app)
      .post('/api/v1/sales')
      .send(dummySales)
      .set('x-access-token', 'invalidToken')
      .end((err, res) => {
        expect(res.status).to.equal(400);
        if (err) return done(err);
        done();
      });
  });

  it('should not create a sales record without all required fields', (done) => {
    dummySales = {
      productId: 1,
      quantity: 15,
      amount: 5000,
      userId: '',
    };
    chai.request(app)
      .post('/api/v1/sales')
      .send(dummySales)
      .set('x-access-token', userAuthentication)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal('all fields are required');
        if (err) return done(err);
        done();
      });
  });

  it('should successfully create a sales record with the right access and credentials', (done) => {
    dummySales = {
      productId: 1,
      quantity: 15,
      amount: 5000,
      userId: 1,
    };
    chai.request(app)
      .post('/api/v1/sales')
      .send(dummySales)
      .set('x-access-token', userAuthentication)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.success).to.equal(true);
        expect(res.body.message).to.equal('sales record created successfully');
        if (err) return done(err);
        done();
      });
  });
});
