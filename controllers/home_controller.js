module.exports.home = function(req, res) {
    // to print cookies
    console.log(req.cookies);
    // to change the cookie
    res.cookie('user_id', 5);
    return res.render('home', {
            title: "home",
        })
        // return res.end('<h1> express is connected with controller</h1>');
}