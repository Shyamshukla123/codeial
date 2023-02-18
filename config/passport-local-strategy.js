const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
passport.use(new LocalStrategy({
        // we define the usernameField value which is unique for all users and it use for finding the user from database
        usernameField: 'email'
    },
    function(email, password, done) {
        // the first email is from user input and the second value email is from database which it has earlier stored
        User.findOne({ email: email }, function(err, user) {
            if (err) {
                console.log("Error in finding user --> passport", err);
                return done(err);
            }
            if (!user || user.password != password) {
                console.log("Invalid user/password")
                return done(null, false);
            }
            return done(null, user);
        })
    }
));

// serializing the user to decide which key should kept in cookies

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

// deserializing the user from key in the cookies

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        if (err) {
            console.log("Error in finding user --> passport", err);
            return done(err);
        }
        return done(null, user);
    })
})

// check if the user is authenticate
passport.checkAuthentication = function(req, rea, next) {
    // if the user is sign in then pass on the request to the next function(controllers action)
    if (req.isAuthenticated()) {
        return next()
    }

    // if the user is not signed in

    return res.redirect('/users/sign-in');
}

passport.setAuthenticateUser = function(req, res, next) {
    if (req.isAuthenticated()) {
        // req.user contains the current signed in user cookie and we are just sending this to the locals for the views
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;