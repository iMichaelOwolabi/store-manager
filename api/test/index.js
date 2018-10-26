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

// Testing get a specific user endpoint
describe('GET /user/:id', () => {
    it('respond with json containing a single user', (done) => {
        request(app)
            .get('/api/v1/users/1')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});

// Testing error 404 on user endpoint
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

// Test Post on users endpoint
describe('POST /users', () => {
    let dummyData = {
        id: 1,
        username: 'dummyUser',
        password: 'dummyPass',
        role: 'dummyRole'
    }
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

// Test PUT on users endpoint
describe('PUT /users/:id', () => {
    let dummyData = {
        id: 1,
        username: 'dummyUser',
        password: 'dummyPass',
        role: 'dummyRole'
    }
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
