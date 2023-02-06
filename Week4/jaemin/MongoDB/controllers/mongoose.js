const User = require('../Scemas/users');
const Post = require('../Scemas/post');
const faker = require('faker');
const mongoose = require('mongoose');
const getRandomUser = require('../utils/getRandomUser');

exports.makeTestingUsers = (req, res) => {
    const seed = req.body.seed;
    var userList = new Array();

    for(var i=0; i<100; i++) {
        faker.mersenne.rand(seed);
        var data = new Object;
        var email = faker.internet.email();
        var password = faker.internet.password();
        data.email = email;
        data.password = password;
        userList.push(data);
        
        const user = new User({
            email: email,
            password: password,
        })
        user.save();
    }
    res.json(userList);
}

exports.makeTestingPosts = async (req, res) => {
    const seed = req.body.seed;
    var postList = new Array();
    var userid;

    for(var i=0; i<100; i++) {

        await getRandomUser()
        .then(user => {
            userid = user._id.toString();
        })
        .catch(err => console.log(err));
    
        faker.mersenne.rand(seed);
        var data = new Object;
        var title = faker.lorem.sentence();
        var content = faker.lorem.lines();
        var date = faker.date.recent();
        var views = faker.datatype.number({max: 1000});
        var like_count = faker.datatype.number({min: 100}); 

        data.title = title;
        data.content = content;
        data.date = date;
        data.views = views;
        data.like_count = like_count;
        data.userid = userid;

        postList.push(data);
        
        const post = new Post({
            title: title,
            content: content,
            date: date,
            views: views,
            like_count: like_count,
            owner : userid
        })
        post.save();
    }
    res.json(postList);
}

exports.getPostData =  async(req, res) => {
    var type = req.query.type;
    var count = parseInt(req.query.counter);
    console.log(count);

    if (type === 'most') {
         res.json(await Post.find({},{title:1, content:1, date:1, views:1,like_count:1, createdAt:1, updatedAt:1}).sort({views: -1}).limit(count));
    }else if (type === 'recent') {
        res.json(await Post.find({},{title:1, content:1, date:1, views:1, like_count:1, createdAt:1, updatedAt:1})
        .sort({createdAt: -1})
        .limit(count));
    }
}

exports.searchPostData = async (req, res) => {
    var type = req.query.type;
    var text = req.query.text;

    if (type === 'title') {
        res.json(await Post.find(
            {"title" : {"$regex" : text, "$options":"i"}}
        )
    )}else if (type === 'content') {
        res.json(await Post.find(
            {"content" : {"$regex" : text, "$options":"i"}}
        )
    )}else if (type === 'writer') {
        res.json(await Post.find(
            {"owner" : {"$regex" : text, "$options":"i"}}
        )
    )}
}