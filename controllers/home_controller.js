module.exports.home = function(req, res) {

    return res.render('home', {
            title: "home",
        })
        // return res.end('<h1> express is connected with controller</h1>');
}