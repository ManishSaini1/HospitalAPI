const express = require("express");
const app = express();
const port = 8000;
const db = require("./config/mongoose");
const passport=require('passport');

app.use(express.urlencoded());
app.use("/",require('./routes'));
app.listen(port, function (err) {
  if (err) {
    console.log("Error while connecting to the Port");
    return;
  }
  console.log("Success Fully Connected to the port");
});
