const User = require('../models/user');
const Product = require('../models/product');
const faker = require('faker');
exports.getMain = (req, res, next) => {
    res.render('main', {
        isloggedIn: req.session.isloggedIn
    });
};

exports.postSignUp = async (req, res, next) => {
    const email = req.body.email;
    const name = req.body.name;
    const phone_number = req.body.phone_number;
    try {
        const user = await User.findOne({ email: email });
        if (user) {
            console.log('Already Exist!');
            res.redirect('/v1');
        }
        else {
            const newUser = new User({
                name: name,
                email: email,
                phone_number: phone_number
            })
            await newUser.save();
            console.log('Created');
            res.redirect('/v1');
        }
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.postLogin = async (req, res, next) => {
    const email = req.body.email;
    try {
        const user = await User.findOne({ email: email });
        if (!user) {
            console.log('not found');
            res.redirect('/v1');
        }
        req.session.isloggedIn = true;
        req.session.user = user;
        res.redirect('/v1');
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.postLogout = async (req, res, next) => {
    try {
        await req.session.destroy();
        res.redirect('/v1');
    }
    catch(err){
        console.log(err);
    }
}
exports.makeProduct = async (req, res, next) => {
    const num = req.body.seed;
    faker.seed(num);
    const userCount = await User.count();
    try {
        if (userCount == 0) {
            const error = new Error('not found user');
            error.statusCode = 404;
            throw error;
        }
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
            let newProduct = new Product({
                name: posts[rannum].name,
                seller: posts[rannum].seller,
                price: posts[rannum].price,
            });
            await newProduct.save();
        }
        res.status(200).json("created");
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}