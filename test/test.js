//Require the dev-dependencies
let chai = require("chai");
let app = require("../server");
var request = require("supertest");
var expect = chai.expect;
let should = chai.should();

//Our parent block

/*
  * Test the /GET route
  */
describe("/GET user", () => {
  it(" should get user info of currently authenticated user", done => {
    request
      .agent(app)
      .get("/wod")
      .end((err, res) => {
        console.log(res.body);
        expect(res.statusCode).to.equal(200);
        expect(res.body.data).to.be.a("array");
        done();
      });
  });
});

describe("/GET coordinates", () => {
  it(" return valid directions", done => {
    request
      .agent(app)
      .get("/trip-duration/41.70966,-71.46507")
      .end((err, res) => {
        expect(res.body).to.be.a("object");
        done();
      });
  });
});
