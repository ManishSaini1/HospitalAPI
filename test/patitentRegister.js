 
//Require the dev-dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../index");
let assert = chai.assert;
const config =require('./config');

chai.use(chaiHttp);
//Our parent block
describe("Patient", () => {
  describe("Get Response of Registered User", () => {
    it("it should return the data of Regestering User", (done) => {
      chai
        .request("http://localhost:8000")
        .post("/patients/register")
        .set(
          "authorization", `Bearer ${config.token} `,
      )
      .set
      (
        "content-type",
        "application/x-www-form-urlencoded",
      )
        .send({
          _method: "POST",
          name: "Manish",
          phone: "1233",
        })

        .end((err, res) => {
          assert.equal(res.status, 200, "Status Matched");
          assert.isNotNull(res.body, "Have Message in Body");
          assert.isNotNull(res.body.details.name, "Have Name of Pateint");
          assert.isNotNull(res.body.details.phone, "Have Phone of Pateint");
          done();
        });
    });
  });
});
