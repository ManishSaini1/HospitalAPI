
//Require the dev-dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../index");
let assert = chai.assert;
const config=require('./config');

chai.use(chaiHttp);
//Our parent block
describe("Report", () => {
    it("it should have all Reports of the User", (done) => {
      chai
        .request("http://localhost:8000")
        .get("/patients/993/all_reports")
        .end((err, res) => {
          assert.equal(res.status, 200, "Status Matched");
          assert.isNotNull(res.body.message, "Message Report Created SuccessFully");
          assert.isArray(res.body.data.report, "Report Array");
          done();
        });
    });
});
