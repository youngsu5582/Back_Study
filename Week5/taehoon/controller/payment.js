const Product = require('../models/product');
const User = require('../models/user');
const History = require('../models/history');
require('dotenv').config();
const axios = require('axios');
const uuid = require("uuid").v4;
const sendMail = require('../util/sendMail');
const sendSMS = require('../util/sendSMS');

exports.getProduct = async (req, res, next) => {
    let rannum = Math.floor(Math.random() * 100);
    const post = await Product.findOne().skip(rannum);
    const user = await User.findOne({ name: req.session.user.name });
    try {
        if (!post || !user) {
            const error = new Error("Not Found");
            error.statusCode = 404;
            throw error;
        }
        res.render('product', {
            posts: post,
            customerName: user.name,
            orderId: uuid(),
        });
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
            next(err);
        }
    }
};

exports.tossPayment = async (req, res, next) => {
    const orderId = req.query.orderId;
    const paymentKey = req.query.paymentKey;
    const amount = req.query.amount;
    const data = {
        paymentKey: paymentKey,
        amount: amount,
        orderId: orderId
    };
    const config = {
        headers: {
            Authorization: 'Basic dGVzdF9za18wUG94eTFYUUw4UnF5WUo5bzA5cjduTzVXbWxnOg==',
            'Content-Type': 'application/json'
        }
    };
    try {
        const payRequest = await axios.post('https://api.tosspayments.com/v1/payments/confirm', data, config);
        //history 생성
        const response = payRequest.data;
        const newHistory = new History({
            status: response.status,
            provatedAt: response.approvedAt,
            orderId: response.orderId,
            orderName: response.orderName,
            paymentKey: response.paymentKey,
            totalAmount: response.totalAmount,
            userId: req.session.user
        });
        await newHistory.save();
        //이메일 전송
        sendMail(req.session.user.email, orderId, amount);
        res.status(200).json("send");
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
            next(err);
        }
    }
};

exports.getHistory = async (req, res, next) => {
    const user = await User.findOne({ email: req.session.user.email });
    try {
        if (!user) {
            const error = new Error("Not Found User");
            error.statusCode = 404;
            throw error;
        }
        const history = await History.find({ userId: user._id });
        res.status(200).json(history);
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
            next(err);
        }
    }
};

exports.postSMS = async (req, res, next) => {
    const paymentKey = req.params.paymentKey;
    const phone_number = req.session.user.phone_number;
    const paymentInfo = await History.findOne({ paymentKey: paymentKey });
    try {
        if (!paymentInfo) {
            const error = new Error("Not Found History");
            error.statusCode = 404;
            throw error;
        }
        sendSMS(phone_number, paymentInfo.orderId, paymentInfo.orderName, paymentInfo.totalAmount);
        res.status(200).json("send message");
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
            next(err);
        }
    }
}