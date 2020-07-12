const passport = require("passport");
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const Doctor = require("../models/doctor");

let opts = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: "SecretKEY",
};
passport.use(
  new JWTStrategy(opts, function (jwtPayload, done) {
    Doctor.findById(jwtPayload._id, function (error, doctor) {
      if (error) {
        console.log("ERror in finding user Using JWT");
        return;
      }
      if (doctor) {
        return done(null, doctor);
      } else {
        return done(null, false);
      }
    });
  })
);
passport.serializeUser(function (doctor, done) {
  done(null, doctor);
});
//deserialize the user from the key in the cookie
passport.deserializeUser(function (id, done) {
  Doctor.findById(id, function (error, doctor) {
    if (error) {
      console.log("Error in finding user -->> passpoer");
      return done(error);
    }
    return done(null, doctor);
  });
});
passport.checkAuthentication = function (req, res, next) {
  return next();

  // return res.redirect('/users/sign-in');
};
passport.setAuthenticatedUser = function (req, res, next) {
  console.log(" I AM HERE", req.isAuthenticated());
  if (req.isAuthenticated()) {
    res.locals.doctor = req.doctor;
  }
  next();
};

module.exports = passport;
