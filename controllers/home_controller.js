const Post = require('../models/post');
const User = require('../models/user');
module.exports.home = async function(req, res) {
    
    try{
        // populate the user of each post
    let posts= await Post.find({})
    .sort('-createdAt')
    .populate('user')
    .populate({
        path: 'comments',
        populate: {
            path: 'user',
        },
        populate:{
            path:'likes',
        }
    }).populate('likes');

    let users= await User.find({}) ;

        return res.render('home', {
            title: "home",
            posts: posts,
            all_users: users,
        })
    }catch(err){
        console.log('Error ',err);
        return ;
    }
    
        // earlier 
    // Post.find({})
    //     .populate('user')
    //     .populate({
    //         path: 'comments',
    //         populate: {
    //             path: 'user',
    //         }
    //     })
    //     .exec(function(err, posts) {
    //         User.find({}, function(err, users) {
    //             return res.render('home', {
    //                 title: "home",
    //                 posts: posts,
    //                 all_users: users,
    //             })
    //         })

    //     })
}

//  to print cookies

    // console.log(req.cookies);
    // to change the cookie
    // res.cookie('user_id', 5);

    // Post.find({}, function(err, posts) {
    //     return res.render('home', {
    //         title: "home",
    //         posts: posts,
    //     })
    // })