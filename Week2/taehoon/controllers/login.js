const User = require('../models/user');
const Product = require('../models/product');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { header } = require('express-validator');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const faker = require('faker');
require("dotenv").config();

exports.postSessionLogin = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    let loadedUser;
    if (req.session.isloggedIn) {
        res.redirect('/v1/auth');
    }
    try {
        const user = await User.findOne({ where: { email: email } });
        if (!user) {
            const error = new Error('not found');
            error.statusCode = 422;
            throw error;
        }
        loadedUser = user;
        const isequal = await bcrypt.compare(password, user.password);
        if (!isequal) {
            console.log(isequal);
            const error = new Error('Wrong password');
            error.statusCode = 401;
            throw error;
        }
        req.session.email = email;
        req.session.phone_number = user.phone_number;
        req.session.isloggedIn = true;
        res.redirect('/v1/login/makeProduct');
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    };
};

exports.postSessionVerify = (req, res, next) => {
    res.status(200).json(req.session.email);
};

exports.makeProduct = async (req, res, next) => {
    const num = 100;
    faker.seed(num);
    const userCount = await User.count();
    const product = await Product.count();
    try {
        if (userCount == 0) {
            const error = new Error('not found user');
            error.statusCode = 404;
            throw error;
        }
        if (product !== 0) {
            res.redirect('/v1/toss');
        } else {
            const posts = [];
            for (let i = 0; i < num; i++) {
                posts.push({
                    name: faker.lorem.words(),
                    seller: faker.lorem.words(),
                    price: Math.floor(Math.random() * 20000),
                });
            }
            for (let j = 0; j < 100; j++) {
                let rannum = Math.floor(Math.random() * num)
                Product.create({
                    name: posts[rannum].name,
                    seller: posts[rannum].seller,
                    price: posts[rannum].price,
                });
            }
            res.redirect('/v1/toss');
        }
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}
