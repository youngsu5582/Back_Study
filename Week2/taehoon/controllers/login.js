const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { header } = require('express-validator');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
require("dotenv").config();
exports.postSessionLogin = async (req, res, next) => {
    const email = req.body.email;
    try {
        const session = await User.findOne({ where: { email: email } });
        if (!session) {
            const error = new Error('not found');
            error.statusCode = 422;
            throw error;
        }
        req.session.email = email;
        res.status(200).json({
            message: 'Log in'
        })
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

exports.postJwtLogin = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    let loadedUser;
    try {
        const user = await User.findOne({ where: { email: email } });
        if (!user) {
            const error = new Error('User not found');
            error.statusCode = 401;
            throw error;
        }
        loadedUser = user;
        console.log(password, user.password);
        const isequal = await (email === user.email) && bcrypt.compare(password, user.password);
        if (!isequal) {
            console.log(isequal);
            const error = new Error('Wrong password');
            error.statusCode = 401;
            throw error;
        }
        const token = jwt.sign(
            {
                email: loadedUser.email
            },
            process.env.JWT_SECRET_KEY,
            { expiresIn: '24h' }
        );
        res.setHeader('authorization', token);
        res.status(200).json({ message: 'Login Complete!' });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.postJwtVerify = (req, res, next) => {
    const token = req.headers.authorization;
    jwt.verify(token, process.env.JWT_SECRET_KEY, (error, decoded) => {
        if (error) {
            const error = new Error('decode failed');
            error.statusCode = 422;
            throw error;
        }
        res.status(200).json(decoded.email);
    });
};