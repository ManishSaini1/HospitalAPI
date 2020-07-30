let mongoose = require("mongoose");
let Patient = require("../models/patient");

//Require the dev-dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../index");
let should = chai.should();

chai.use(chaiHttp);
//Our parent block
describe("Patient", () => {
  describe("/GET reports/positive-admit", () => {
    it("it should GET all the Patients", (done) => {
      chai
        .request("http://localhost:8000")
        .get("/reports/positive-admit")
        .end((err, res) => {
        //   res.should.have.status(200);
        should.exist(true);
        res.should.have.status(200);
        
        //   res.body.should.be.a("array");
        //   res.body.length.should.be.eql(0);
        console.log("Res is", res);
        console.log("Error is", err);
          done();
        });
    });
  });
});
