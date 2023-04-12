const request = require('supertest');
const expect = require('chai').expect;

const baseUrl = 'http://localhost:3000/api/v1';

let dogId1, dogId2;

describe('Testing challenge #3', () => {
  beforeEach((done) => setTimeout(done, 500));

  it('Inserting data', (done) => {
    request(baseUrl)
      .post(`/dog`)
      .send({ breed: 'German shepherd', age: 11, color: 'black' })
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .end(function (err, res) {
        dogId1 = res.body.id;
      });

    request(baseUrl)
      .post(`/dog`)
      .send({ breed: 'Pitbull', age: 5, color: 'white' })
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .end(function (err, res) {
        dogId2 = res.body.id;
        done();
      });
  });

  it('findOne - should return a Dog object', (done) => {
    request(baseUrl)
      .get(`/dog/${dogId1}`)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .end(function (err, res) {
        expect(res.statusCode).to.be.equal(200);
        expect(res.body).to.be.instanceOf(Object);
        expect(res.body).to.haveOwnProperty('id');
        expect(res.body).to.haveOwnProperty('breed').eq('German shepherd');
        expect(res.body).to.haveOwnProperty('age').eq(11);
        expect(res.body).to.haveOwnProperty('color').eq('black');
        done();
      });
  });

  it('findAll - should return an array of Dogs object', (done) => {
    request(baseUrl)
      .get('/dog')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .end(function (err, res) {
        expect(res.statusCode).to.be.equal(200);
        expect(res.body).to.be.instanceOf(Array);
        expect(res.body.length).to.be.gt(0);
        done();
      });
  });

  it('find - should return an array of Dogs object matching criteria', (done) => {
    request(baseUrl)
      .get('/dog')
      .query({ breed: 'German shepherd', age: 10 })
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .end(function (err, res) {
        expect(res.statusCode).to.be.equal(200);
        expect(res.body).to.be.instanceOf(Array);
        expect(res.body[0]).to.haveOwnProperty('id');
        expect(res.body[0]).to.haveOwnProperty('breed').eq('German shepherd');
        expect(res.body[0]).to.haveOwnProperty('age').eq(11);
        expect(res.body[0]).to.haveOwnProperty('color').eq('black');
        done();
      });
  });

  it('Erasing data', (done) => {
    request(baseUrl)
      .delete(`/dog/${dogId1}`)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .end(function (err, res) {});

    request(baseUrl)
      .delete(`/dog/${dogId2}`)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .end(function (err, res) {
        done();
      });
  });
});
