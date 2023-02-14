const express = require('express');
const cookieParser = require('cookie-parser')
const app = express();

const port = 8000;


app.use(express.urlencoded());
app.use(cookieParser());




const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const { urlencoded } = require('express');
app.use(expressLayouts)

app.use(express.static('./assets'));
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.set('view engine', 'ejs');
app.set('views', './views');


// express use routes

app.use('/', require('./routes/index'));



app.listen(port, (err) => {
    if (err) {
        console.log(`'Erro in server : ${err}`);
        return;
    }
    console.log(`Server is working on a port : ${port}`);
})