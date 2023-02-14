const express = require('express');
const app = express();
const session = require("express-session");
const MongoStore = require("connect-mongo");
const router = require('./routes');
require('dotenv').config();

app.set('views', './views');
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
    session({
        secret: process.env.COOKIE_SECRET,
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({
            mongoUrl: process.env.MONGO_URI,
        }),
        cookie: { maxAge: 3.6e6 * 24 }, // 24시간 뒤 세션 만료
    })
);

app.use('/v1', router);

module.exports = app;