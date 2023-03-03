const request = require("supertest");
const expect = require("chai").expect;

const baseUrl = "http://localhost:3000/api/v1";

describe("Testing challenge #3", () => {
  it("findOne - should return a Dog object", (done) => {
    request(baseUrl)
      .get(`/dog/${1}`)
      .set("Accept", "application/json")
      .set("Content-Type", "application/json")
      .end(function (err, res) {
        expect(res.statusCode).to.be.equal(200);
        expect(res.body).to.be.instanceOf(Object);
        expect(res.body).to.haveOwnProperty("id");
        expect(res.body).to.haveOwnProperty("race");
        expect(res.body).to.haveOwnProperty("age");
        expect(res.body).to.haveOwnProperty("color");
        done();
      });
  });

  it("findAll - should return an array of Dogs object", (done) => {
    request(baseUrl)
      .get("/dog")
      .set("Accept", "application/json")
      .set("Content-Type", "application/json")
      .end(function (err, res) {
        expect(res.statusCode).to.be.equal(200);
        expect(res.body).to.be.instanceOf(Array);
        expect(res.body.length).to.be.gt(0);
        done();
      });
  });

  it("find - should return a Dog object", (done) => {
    request(baseUrl)
      .get("/dog")
      .query({ race: "German shepherd", age: 11 })
      .set("Accept", "application/json")
      .set("Content-Type", "application/json")
      .end(function (err, res) {
        expect(res.statusCode).to.be.equal(200);
        expect(res.body).to.be.instanceOf(Object);
        expect(res.body).to.haveOwnProperty("id");
        expect(res.body).to.haveOwnProperty("race").eq("German shepherd");
        expect(res.body).to.haveOwnProperty("age").eq(11);
        expect(res.body).to.haveOwnProperty("color").eq("black");
        done();
      });
  });
});
