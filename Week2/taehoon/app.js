const path = require('path');
require("dotenv").config();
const cookieParser = require('cookie-parser');
const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./util/database');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);

const app = express();
const options = {
    host: "localhost",
    port: 3306,
    user: "root",
    password: process.env.DB_PSWORD,
    database: "back_study"
};

const sessionStore = new MySQLStore(options);

app.use(
    session({
        key: "name",
        secret: process.env.SES_SECRET_KEY,
        store: sessionStore,
        resave: false,
        saveUninitialized: false,
    })
);



const registerRoutes = require('./routes/register');
const loginRoutes = require('./routes/login');
const socialRoutes = require('./routes/social');

app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({ secret: process.env.SES_SECRET_KEY, resave: false, saveUninitialized: false }));
app.use(express.urlencoded({ extended: true }));

app.use('/v1', registerRoutes);
app.use('/v1/login', loginRoutes);
app.use(socialRoutes);
app.use((error, req, res, next) => {
//    console.log(error);
    const status = error.statuscode || 500;
    const message = error.message;
    res.status(status).json({
        message: message
    })
});


sequelize.sync()
    .then((result) => {
        app.listen(3000);
    })
    .catch(err => {
        console.log(err);
    });