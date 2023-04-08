const express = require('express');
const cookieParser = require('cookie-parser')
const app = express();
const port = 8000;
// used for session cookies
const session = require('express-session');
const passport = require('passport')
const passportLocal = require('./config/passport-local-strategy');
const passportJWT =require('./config/passport-jwt-strategy');
const passportGoogle= require('./config/passport-google-oauth2-strategy');
const MongoStore = require('connect-mongo');
const flash= require('connect-flash');
const custMware= require('./config/middleware');

const User =require('./models/user')

app.use(express.urlencoded());
app.use(cookieParser());


// set up th chat server to  be used with socket.io for chat engine
var io =require('socket.io')(80,{
    cors:{
        origin:"*",
        methods:["GET","POST"]
        // origin:"http://localhost:5000"
    }
});
io.on('connection',function(sockect){
    // "on" is used to recieve the message or for listening
    sockect.on("join_room",function(data){
        console.log("connected to chat engine",data);
        sockect.join(data.chatroom);

        io.in(data.chatroom).emit('user_joined',data);
    })

        sockect.on('send_message',function(data){
            console.log("message send",data);
            io.in(data.chatroom).emit('receive_message',data);
        })
    // broadcat is used to send  mesage to all expect itself( eg. group chat)
})



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





// mongoStore is used to store session cookie in the db
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