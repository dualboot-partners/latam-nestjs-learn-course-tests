const request = require("supertest");
const expect = require("chai").expect;

const baseUrl = "http://localhost:3000/api/v1";

describe("Testing challenge #1", () => {
  it("findOne - should successfully retrieve the chain {findOne is working, and the dogId parameter is 2}", (done) => {
    request(baseUrl)
      .get(`/dog/${2}`)
      .set("Accept", "application/json")
      .set("Content-Type", "application/json")
      .end(function (err, res) {
        expect(res.statusCode).to.be.equal(200);
        expect(res.text).to.be.string("findOne is working, and the dogId parameter is 2");
        done();
      });
  });

  it("findAll - should successfully retrieve the chain {findAll function getting all dogs}", (done) => {
    request(baseUrl)
      .get("/dog")
      .set("Accept", "application/json")
      .set("Content-Type", "application/json")
      .end(function (err, res) {
        expect(res.statusCode).to.be.equal(200);
        expect(res.text).to.be.string("findAll function getting all dogs");
        done();
      });
  });

  it("find - should successfully retrieve the chain {find function with params age: 8 & race: Pitbull}", (done) => {
    request(baseUrl)
      .get("/dog")
      .query({ race: "Pitbull", age: 8 })
      .set("Accept", "application/json")
      .set("Content-Type", "application/json")
      .end(function (err, res) {
        expect(res.statusCode).to.be.equal(200);
        expect(res.text).to.be.string(
          "find function with params age: 8 & race: Pitbull"
        );
        done();
      });
  });

  it("create - should successfully retrieve the chain {create function with properties, race: Poddle, age: 12 & color: white}", (done) => {
    request(baseUrl)
      .post("/dog")
      .send({ race: "Poddle", age: 12, color: "white" })
      .set("Accept", "application/json")
      .set("Content-Type", "application/json")
      .end(function (err, res) {
        expect(res.statusCode).to.be.equal(201);
        expect(res.text).to.be.string(
          "create function with properties, race: Poddle, age: 12 & color: white"
        );
        done();
      });
  });

  it("update - should successfully retrieve the chain {update function dog with id: 20 & property, age: 4}", (done) => {
    request(baseUrl)
      .patch(`/dog/${20}`)
      .send({ age: 4 })
      .set("Accept", "application/json")
      .set("Content-Type", "application/json")
      .end(function (err, res) {
        expect(res.statusCode).to.be.equal(200);
        expect(res.text).to.be.string(
          "update function dog with id: 20 & property, age: 4"
        );
        done();
      });
  });

  it("delete - should successfully retrieve the chain {delete function dog with id: 8}", (done) => {
    request(baseUrl)
      .delete(`/dog/${8}`)
      .set("Accept", "application/json")
      .set("Content-Type", "application/json")
      .end(function (err, res) {
        expect(res.statusCode).to.be.equal(200);
        expect(res.text).to.be.string("delete function dog with id: 8");
        done();
      });
  });
});
