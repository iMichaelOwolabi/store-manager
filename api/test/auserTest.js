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

let dummyUser;

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

describe('GET /api/v1/users', () => {
  it('should not get users without authentication token', (done) => {
    chai.request(app)
      .get('/api/v1/users')
      .end((err, res) => {
        expect(res.status).to.equal(401);
        expect(res.body.success).to.equal(false);
        if (err) return done(err);
        done();
      });
  });

  it('should not process request with invalid token', (done) => {
    chai.request(app)
      .get('/api/v1/users')
      .set('x-access-token', 'invalidToken')
      .end((err, res) => {
        expect(res.status).to.equal(400);
        if (err) return done(err);
        done();
      });
  });

  it('should respond with json containing a list of all users', (done) => {
    chai.request(app)
      .get('/api/v1/users')
      .set('x-access-token', authentication)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.success).to.equal(true);
        if (err) return done(err);
        done();
      });
  });

  it('should not get a user that does not exist', (done) => {
    chai.request(app)
      .get('/api/v1/users/98745')
      .set('x-access-token', authentication)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal('The specified user does not exist on this platform');
        if (err) return done(err);
        done();
      });
  });

  it('should get a user that exists', (done) => {
    chai.request(app)
      .get('/api/v1/users/1')
      .set('x-access-token', authentication)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.success).to.equal(true);
        expect(res.body.message).to.equal('Below is the specified user');
        if (err) return done(err);
        done();
      });
  });

  it('should not signup user without a username', (done) => {
    dummyUser = {
      username: '',
      password: 'user2',
      role: 'user',
    };
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(dummyUser)
      .set('x-access-token', authentication)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal('username is required to register');
        if (err) return done(err);
        done();
      });
  });

  it('should not signup user without a password', (done) => {
    dummyUser = {
      username: 'user2',
      password: '',
      role: 'user',
    };
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(dummyUser)
      .set('x-access-token', authentication)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal('password is required to register');
        if (err) return done(err);
        done();
      });
  });

  it('should successfully sign up a new user with the right access and credentials', (done) => {
    dummyUser = {
      username: 'user2',
      password: 'user2',
      role: 'user',
    };
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(dummyUser)
      .set('x-access-token', authentication)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.success).to.equal(true);
        if (err) return done(err);
        done();
      });
  });

  it('should successfully sign up a new user with the right access and credentials', (done) => {
    dummyUser = {
      username: 'user3',
      password: 'user3',
      role: 'user',
    };
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(dummyUser)
      .set('x-access-token', authentication)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.success).to.equal(true);
        if (err) return done(err);
        done();
      });
  });

  it('should not update a user without authentication token', (done) => {
    dummyUser = {
      username: 'user2',
      password: 'user2',
      role: 'role',
    };
    chai.request(app)
      .put('/api/v1/users/2')
      .send(dummyUser)
      .set('x-access-token', '')
      .end((err, res) => {
        expect(res.status).to.equal(401);
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal('Unauthorized User');
        if (err) return done(err);
        done();
      });
  });

  it('should not update a user that does not exit', (done) => {
    const dummyUserUpdate = {
      role: 'admin',
    }
    chai.request(app)
      .put('/api/v1/users/98745')
      .send(dummyUserUpdate)
      .set('x-access-token', authentication)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal('User not found');
        if (err) return done(err);
        done();
      });
  });

  it('should update an existing user with the right authorization and credentials', (done) => {
    const dummyUserUpdate = {
      role: 'admin',
    };
    chai.request(app)
      .put('/api/v1/users/2')
      .send(dummyUserUpdate)
      .set('x-access-token', authentication)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.success).to.equal(true);
        expect(res.body.message).to.equal('User\'s information successfully updated');
        if (err) return done(err);
        done();
      });
  });
});
