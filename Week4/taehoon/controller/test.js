const User = require('../models/user');
const Post = require('../models/post');
const Comment = require('../models/comment');
const faker = require('faker');
const bcrypt = require('bcrypt');
require('dotenv').config();


exports.createUserData = async (req, res, next) => {
    const num = req.body.seed;
    faker.seed(seed);
    try {
        const users = [];
        for (let i = 0; i < num; i++) {
            users.push({
                email: faker.internet.email(),
                password: faker.lorem.word()
            });
        }
        for (let j = 0; j < 100; j++) {
            let rannum = Math.floor(Math.random() * num)
            await User.create({
                email: users[rannum].email,
                password: users[rannum].password
            });
        }
        console.log(await User.count());
        res.status(200).json("created");
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.createPostData = async (req, res, next) => {
    const num = req.body.seed;
    faker.seed(seed);
    const userCount = await User.count();
    try {
        if(userCount==0){
            const error = new Error('not found user');
            error.statusCode = 404;
            throw error;
        }
        const users = [];
        for (let i = 0; i < num; i++) {
            users.push({
                title: faker.lorem.words(),
                content: faker.lorem.paragraph(),
                like_count: Math.floor(Math.random() * 400),
                views: Math.floor(Math.random() * 650),
                userId: Math.floor(Math.random()*userCount+1)
            });
        }
        for (let j = 0; j < 100; j++) {
            let rannum = Math.floor(Math.random() * num)
            Post.create({
                title: users[rannum].title,
                content: users[rannum].content,
                like_count: users[rannum].like_count,
                views: users[rannum].views,
                userId: users[rannum].userId
            });
        }
        res.status(200).json("created");
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};