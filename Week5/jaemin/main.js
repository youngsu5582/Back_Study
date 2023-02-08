const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const port = 4000;
const connect = require("./Schema/index");
var express_session = require('express-session');
const indexRoutes = require('./routes/index');

require('dotenv').config();

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.set('view engine', 'ejs');
app.set('views', './views');

connect();

app.use(express_session({
    secret: "secretKey",
    resave: false,
    saveUninitialized: false,
    store:require('mongoose-session')(mongoose),
}));

app.use(indexRoutes);

app.listen(port, () => console.log("Server Connected.."));