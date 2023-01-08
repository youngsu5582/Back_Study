const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const indexRoutes = require('./routes/index');
const cookieRoutes = require('./routes/cookie');
const cookieParser = require('cookie-parser');

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use('/v1', indexRoutes);
app.use('/v1/cookie', cookieRoutes);


app.use((error, req, res, next) =>{
    console.log(error);
    const status = error.statuscode || 500;
    const message = error.message;
    res.status(status).json({
        message: message
    })
})

app.listen(3000);