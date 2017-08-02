const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExctractJwt = require('passport-jwt').ExtractJwt;

// Setup options for jwt strategy
const jwtOptions = {
    jwtFromRequest : ExctractJwt.fromHeader('authorization'),
    secretOrKey: config.secret
};

// Create JWT strategy
const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
    /* See if the user ID in the payload exists in our DB, 
    if it does, call 'done' with user object, 
    otherwise done without user object*/
    User.findById(payload.sub, (err, user) => {
        if (err) {
            return done(err, false);
        }
        if (user) {
            done(null, user);
        } else {
            done(null, false);
        }
    })

})

// Tell passport to use this strategy
passport.use(jwtLogin);