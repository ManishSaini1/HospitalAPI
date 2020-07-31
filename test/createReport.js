 
//Require the dev-dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../index");
let assert = chai.assert;
const config=require('./config');

chai.use(chaiHttp);
//Our parent block
describe("Report", () => {
    it("it should return newly created Report", (done) => {
      chai
        .request("http://localhost:8000")
        .post("/patients/993/create_report")
        .set(
          "content-type",
          "application/x-www-form-urlencoded",
        ) .set(
            "authorization", `Bearer ${config.token} `,
        )
        .send({
          _method: "POST",
          status: "Quarantine",
        })

        .end((err, res) => {
          assert.equal(res.status, 200, "Status Matched");
          assert.isNotNull(res.body.message, "Message Report Created SuccessFully");
          assert.isNotNull(res.body.doctor, "Doctor Name");
          assert.isNotNull(res.body.patient, "Patient Name");
          assert.isNotNull(res.body.status, "Report Status");
          assert.isNotNull(res.body.date, "Report Date");
          done();
        });
    });
});
