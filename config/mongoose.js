const mongoose = require('mongoose');
mongoose.set("strictQuery", false);
mongoose.connect("mongodb://0.0.0.0:27017/codeial_development");
//  connect  with mongodb
// mongoose.connect('mongodb://localhost/');

// make connection
const db = mongoose.connection;

// check is there any error in connection
db.on('error', console.error.bind(console, 'error connecting to db'));

// check for succesfull connection is done or not
db.once('open', function() {
    console.log('succesfully connected to the db');
})
module.exports = db;