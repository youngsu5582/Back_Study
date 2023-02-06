const User = require('../models/user');
const Post = require('../models/post');
const faker = require('faker');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

exports.makeTestingUsers = (req,res) => {
    var num = req.body.seed;
    var userList = new Array();

    for(var i=0; i<100; i++) {
        faker.mersenne.rand(num);
        var data = new Object;
        email = faker.internet.email();
        password = faker.internet.password();
        data.email = email;
        data.password = password;
        userList.push(data);
        User.create({
            email : email,
            password : password
        }).then().catch(err => {
            console.log(err);
        })
    }
    res.json(userList);
}

exports.makeTestingPosts =  async (req, res) => {
    var num = req.body.seed;
    var postList = new Array();
    var user_id;

    for(var i=0; i<100; i++) {

        await User.findOne({
            order: Sequelize.literal('RAND()')
        })
        .then(data => {
            user_id = data.userId;
        })
        .catch(err => {
            console.log(err);
        })

        faker.mersenne.rand(num);
        var Postdata = new Object;
        title = faker.lorem.sentence();
        content = faker.lorem.lines();
        date = faker.date.recent();
        like_count = faker.datatype.number({max: 1000});
        views = faker.datatype.number({min: 100});

        Postdata.title = title;
        Postdata.content = content;
        Postdata.like_count = like_count;
        Postdata.views = views;
        Postdata.user_id = user_id;
        Postdata.date = date;

        postList.push(Postdata);
        Post.create({
            title : title,
            content : content,
            date : date,
            views : views,
            like_count : like_count,
            userUserId : user_id
        }).then().catch(err => {
            console.log(err);
        })
    }
    res.json(postList);
}

exports.getPostData = (req, res) => {
    var type = req.query.type;
    var count = parseInt(req.query.counter);

    if (type === 'most') {
         Post.findAll({
            attributes: ['postId','title','content','userUserId', 'date', 'views', 'like_count','createdAt','updatedAt'],
            order: [['views', 'DESC']],
            limit: count,
        })
        .then(data => {
            res.json(data);
        })
        .catch(err => { console.log(err);})
    }else if (type === 'recent') {
        Post.findAll({
            attributes: ['postId','title','content','userUserId', 'date', 'views', 'like_count','createdAt','updatedAt'],
            order: [['date', 'DESC']],
            limit: count,
        })
        .then(data => {
            res.json(data);
        })
        .catch(err => { console.log(err);})
    }
}

exports.searchPostData = (req, res) => {
    var type = req.query.type;
    var text = req.query.text;

    if (type === 'title') {
        Post.findAll({
            where: {
                title: {
                    [Op.like]: "%" + text + "%" 
                }
            }
        })
        .then(data => {
            res.json(data);
        })
        .catch(err => { console.log(err);})

    }else if (type === 'content') {
        Post.findAll({
            where: {
                content: {
                    [Op.like]: "%" + text + "%" 
                }
            }
        })
        .then(data => {
            res.json(data);
        })
        .catch(err => { console.log(err);})

    }else if (type = 'writer') {
        Post.findAll({
            where: {
                userUserId: {
                    [Op.like]: "%" + parseInt(text) + "%" 
                }
            }
        })
        .then(data => {
            res.json(data);
        })
        .catch(err => { console.log(err);})
    }
}