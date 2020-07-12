const express = require("express");
const app = express();
const port = 8000;
const db = require("./config/mongoose");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const passportJWT = require("./config/passport-jwt-strategy");

app.use(express.urlencoded());
// app.use(passport.initialize());
// app.use(passport.setAuthenticatedUser);
app.use(
  session({
    name: "HospitalSession",
    secret: "Antyhing",
    saveUninitializedL: true,
    resave: true,
    cookie: {
      maxAge: 60 * 10 * 10 * 10000,
    },
    store: new MongoStore(
      {
        mongooseConnection: db,
        autoRemove: "disabled",
      },
      function (error) {
        if (error) {
          console.log("error in storing cookies in mongoo");
        } else {
          console.log("successfully stored");
        }
      }
    ),
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
app.use("/", require("./routes"));
app.listen(port, function (err) {
  if (err) {
    console.log("Error while connecting to the Port");
    return;
  }
  console.log("Success Fully Connected to the port");
});
