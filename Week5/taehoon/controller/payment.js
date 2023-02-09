const Product = require('../models/product');
const User = require('../models/user');
const History = require('../models/history');
require('dotenv').config();
const axios = require('axios');
const uuid = require("uuid").v4;
const nodemailer = require('nodemailer');
const { SolapiMessageService } = require('solapi');
const messageService = new SolapiMessageService(process.env.SOLAPI_KEY, process.env.SOLAPI_SECRET_KEY);

exports.getProduct = async (req, res, next) => {
    let rannum = Math.floor(Math.random() * 100);
    const post = await Product.findOne().skip(rannum);
    const user = await User.findOne({ name: "탱탱볼" });
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
        let transporter = nodemailer.createTransport({
            service: 'naver',
            host: 'smtp.naver.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.NODEMAILER_USER,
                pass: process.env.NODEMAILER_PASS,
            },
        });
        let info = await transporter.sendMail({
            from: `hello ${process.env.NODEMAILER_USER}`,
            to: req.session.user.email,
            subject: 'Toss Payment Successed!',
            text: `총금액 : ${response.totalAmount}\n 주문번호 : ${response.orderId}`,
            html: `<span>총금액 : ${response.totalAmount}<span><br><span>주문번호 : ${response.orderId}</span>`,
        });
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
    const paymentInfo = await History.findOne({ paymentKey: paymentKey });
    try {
        if (!paymentInfo) {
            const error = new Error("Not Found History");
            error.statusCode = 404;
            throw error;
        }
        await messageService.send({
            "to": req.session.user.phone_number,
            "from": process.env.SOLAPI_NUMBER,
            "text": `주문번호 : ${paymentInfo.orderId}\n 주문 명 : ${paymentInfo.orderName}\n 주문금액 : ${paymentInfo.totalAmount}`,
        });
        res.status(200).json("send message");
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
            next(err);
        }
    }
}