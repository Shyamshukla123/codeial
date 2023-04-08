const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User =require('../models/user');


// tell passport to use new strategy for google login/signup
passport.use(new googleStrategy({
    clientID:'333339274861-ceunvu08i646juh5mcvmetn82ioq14kh.apps.googleusercontent.com',
    clientSecret:'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',
    callbackURL:'http://localhost:8000/users/auth/google/callback'
},
function(accessToken,refreshToken,profile,done){
    // find a user
   User.findOne({email:profile.emails[0].value}).exec(function(err,user){
    if(err){
        console.log('error in google auth strtegy',err);
        return;
    }
    if(user){
        // if user found, set this user as req.user
        return done(null,user);
    }else{
        // if not found, create the usr and set it as req.user
        User.create({
            name:profile.displayName,
            email:profile.emails[0],
            password:crypto.randomBytes(20).toString('hex'),
        },function(err,user){
            if(err){
                console.log('error in creating user in google auth strtegy',err);
                return;
            }
            return done(null,user);
        })
    }
   })
}

))

module.exports=passport;