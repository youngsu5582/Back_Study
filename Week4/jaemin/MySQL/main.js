const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./util/database.js');
const app = express();
const port = 4000;
const User = require('./models/user');
const Post = require('./models/post');
const Comment = require('./models/comment');
const processingRoutes = require('./routes/processing');

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

Post.belongsTo(User, {constraints: true, onDelete: 'CASCADE'});
User.hasMany(Post);
Post.hasMany(Comment);
Comment.belongsTo(Post, {onDelete: 'CASCADE'});

sequelize
.sync()
.then(result => {
    app.listen(port);
})
.catch(err => {
    console.log(err);
});

app.get('/', (req,res) => {
    res.send("hello");
})

app.use(processingRoutes);
