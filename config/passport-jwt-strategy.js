const passport = require("passport");
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const Doctor = require("../models/doctor");

let opts = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: env.jwt_secret,
};
passport.use(
  new JWTStrategy(opts, function (jwtPayload, done) {
    Doctor.findById(jwtPayload._id, function (error, doctor) {
      if (error) {
        console.log("ERror in finding user Using JWT");
        return;
      }
      if (user) {
        return done(null, doctor);
      } else {
        return done(null, false);
      }
    });
  })
);
module.exports = passport;
