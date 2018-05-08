//passport strategy
const passport = require('passport'),
      LocalStrategy = require('passport-local').Strategy,
      user = require('../models/user');

module.exports = function(passport) {
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        user.getUserById(id, function(err,results){
            done(err, results[0]);
        });
    });

    passport.use( new LocalStrategy(
        function(username, password, done) {
            user.getUserByEmail(username, function (err, results) {
                if (err) {
                    return done(err);
                }
                if (!results.length) {
                    return done(null, false);
                }

                user.comparePassword(password, results[0].password, function (err, isMatch) {
                    if (err) throw err;
                    if (isMatch){
                        return done(null, results[0]);
                    } else {
                        return done(null, false);
                    }
                });
            });
        }
    ));
};