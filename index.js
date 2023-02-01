const express = require('express');

const app = express();

const port = 8000;

// express use routes

app.use('/', require('./routes/index'));



app.listen(port, (err) => {
    if (err) {
        console.log(`'Erro in server : ${err}`);
        return;
    }
    console.log(`Server is working on a port : ${port}`);
})