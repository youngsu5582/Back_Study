const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./util/database');
require("dotenv").config();
const app = express();
const User = require('./models/user');
const Post = require('./models/post');
const Comment = require('./models/comment');
const versionRoutes = require('./routes/version');
const { useInflection } = require('sequelize');

app.use(bodyParser.json());

app.use('/v1', versionRoutes);

app.use((error, req, res, next) => {
    const status = error.statusCode || 500;
    const message = error.message;
    res.status(status).json({
        message: message
    })
});

//User, Post : 1:N
Post.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
Comment.belongsTo(Post, { constrains: true, onDelete: 'CASCADE'});
Post.hasMany(Comment);
User.hasMany(Post);
User.hasMany(Comment);

sequelize
    .sync()
    // .sync({ force: true })
    .then((result) => {
        app.listen(3000);
    })
    .catch(err => {
        console.log(err);
    });