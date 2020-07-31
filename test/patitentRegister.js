let mongoose = require("mongoose");
let Patient = require("../models/patient");
const token = `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjBjNjdjODQ3M2NkZjNkYWM2NzhlMDUiLCJuYW1lIjoiTWFuaXNoIiwiZW1haWwiOiJtQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiMTIiLCJjcmVhdGVkQXQiOiIyMDIwLTA3LTEzVDEzOjU1OjIwLjM4MloiLCJ1cGRhdGVkQXQiOiIyMDIwLTA3LTEzVDEzOjU1OjIwLjM4MloiLCJfX3YiOjAsImlhdCI6MTU5NjE0MzM4NywiZXhwIjoxNTk2MjAzMzg3fQ.PETHce9r49uPBEZ1Nw5MGy0hM1bVmkUUzAIhrDr_10o"}`;

//Require the dev-dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../index");
let assert = chai.assert;
let should = chai.should();

chai.use(chaiHttp);
//Our parent block
describe("Patient", () => {
  describe("Get Response of Registered User", () => {
    it("it should return the data of Regestering User", (done) => {
      chai
        .request("http://localhost:8000")
        .post("/patients/register")
        .set(
          "content-type",
          "application/x-www-form-urlencoded",
          "Authorization",
          { token }
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
