const Post = require('../models/post');

module.exports.home = function(req, res) {
    // to print cookies
    // console.log(req.cookies);
    // to change the cookie
    // res.cookie('user_id', 5);

    // Post.find({}, function(err, posts) {
    //     return res.render('home', {
    //         title: "home",
    //         posts: posts,
    //     })
    // })

    // populate the user of each post
    Post.find({}).populate('user').exec(function(err, posts) {
        return res.render('home', {
            title: "home",
            posts: posts,
        })
    })




    // return res.end('<h1> express is connected with controller</h1>');
}