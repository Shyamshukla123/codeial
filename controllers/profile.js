module.exports.profile = function(req, res) {
    return res.end('<h1>Profile viewed</h1>', {
        title: "Profile",
    });
}