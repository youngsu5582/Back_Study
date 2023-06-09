const Product = require('../models/product');
const User = require('../models/user');
require('dotenv').config();
const axios = require('axios');
const uuid = require("uuid").v4;
const sendMail = require('../util/sendMail');
const sendSMS = require('../util/sendSMS');

exports.getProduct = async (req, res, next) => {
    let rannum = Math.floor(Math.random() * 100);
    const post = await Product.findOne({
        offset: rannum
    });
    const user = req.session.email;
    try {
        if(user===undefined){
            res.redirect('/v1/auth');
        }
        if (!post) {
            const error = new Error("Not Found");
            error.statusCode = 404;
            throw error;
        } else {
            res.render('product', {
                posts: post,
                customerName: user.email,
                orderId: uuid(),
            });
        }
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
    const phone_number = req.session.phone_number;
    console.log(phone_number);
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
        //이메일 전송
        if (phone_number===undefined) {
            sendMail(req.session.email, orderId, amount);
            res.status(200).json("이메일전송 완료. 문자전송 기능은 일반 로그인만 가능. 주소창에 /v1/auth 입력시 로그인화면 이동, /v1/toss 입력시 결제시스템 테스트");
        }
        else {
            sendMail(req.session.email, orderId, amount);
            sendSMS(phone_number, orderId, response.orderName, response.totalAmount);
            res.status(200).json("이메일, 문자 전송 완료. 주소창에 /v1/auth 입력시 로그인화면 이동, /v1/toss 입력시 결제시스템 테스트");
            
        }
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
            next(err);
        }
    }
};