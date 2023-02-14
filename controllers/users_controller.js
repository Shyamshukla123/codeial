const User = require('../models/user');

module.exports.userFile = function(req, res) {
    return res.render('users-profile', {
        title: "home",
    });
}


module.exports.signIn = function(req, res) {
    return res.render('user_sign_in', {
        title: "SignIn",
    })
}


module.exports.signUp = function(req, res) {
    return res.render('user_sign_up', {
        title: "SignUp",
    })
}

// collect data from sign Up form

module.exports.create = function(req, res) {
    if (req.body.password != req.body.confirmPassword) {
        return res.redirect('back');
    }

    User.findOne({ email: req.body.email }, function(err, user) {
        if (err) { console.log('Error in finding email'); return; }
        if (!user) {
            User.create(req.body, function(err, user) {
                if (err) { console.log('Error in sign up '); return; }
                return res.redirect('/users/sign-in');
            })
        } else {
            return res.redirect('back');
        }

    });

}

// signin and create session for user

module.exports.createSession = function(req, res) {

}