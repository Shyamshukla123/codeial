const express = require('express');
const cookieParser = require('cookie-parser')
const app = express();
const port = 8000;
// used for session cookies
const session = require('express-session');
const passport = require('passport')
const passportLocal = require('./config/passport-local-strategy');

const passportJWT =require('./config/passport-jwt-strategy');

const MongoStore = require('connect-mongo');
const flash= require('connect-flash');
const custMware= require('./config/middleware');

const User =require('./models/user')

app.use(express.urlencoded());
app.use(cookieParser());



const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const { urlencoded } = require('express');

app.use(express.static('./assets'));
app.use(expressLayouts)

// for uplaoded folder view
app.use('/uploads', express.static(__dirname+'/uploads'));

app.set('layout extractStyles', true);
app.set('layout extractScripts', true);



// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');





// monoStore is used to store session cookie in the db
app.use(session({
    name: "codiel",
    // TODO  change the secret before deployment
    secret: "blahsomething",
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100),
    },
    store: MongoStore.create({
            mongoUrl: 'mongodb://0.0.0.0:27017/codeial_development',
            mongooseConnection: db,
            autoRemove: 'disabled',
        },
        function(err) {
            console.log(err || "Error in store connection");
        }
    ),
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticateUser);
app.use(flash());
app.use(custMware.setFlash);
// use express router
app.use('/', require('./routes/index'));


app.listen(port, (err) => {
    if (err) {
        console.log(`'Erro in server : ${err}`);
        return;
    }
    console.log(`Server is working on a port : ${port}`);
})