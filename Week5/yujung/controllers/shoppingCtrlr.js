const axios = require('axios');
const productDAO = require('../dao/productDAO');
const historyDAO = require('../dao/historyDAO');
const session = require('../util/session');
const mail = require('../services/mail');
const message = require('../services/message');

// 토스 결제요청
exports.toss = async (req, res) => {
    if(!session.isVaildSession(req.session)){
        res.redirect('/v1/login');
        return;
    }

    const product = await productDAO.getRandomProduct();
    res.render('shopping', {
        seller: product[0].seller,
        price: product[0].price,
        name: product[0].name,
        customerId: req.session._id,
        customerName: req.session.name
    });
};

// 토스 결제
exports.pay = async (req, res) => {
    if(!session.isVaildSession(req.session)){
        res.redirect('/v1/login');
        return;
    }

    // 토스 결제
    const response = await axios({
        url: 'https://api.tosspayments.com/v1/payments/confirm',
        method: 'post',
        headers: {
            'Authorization': 'Basic dGVzdF9za196WExrS0V5cE5BcldtbzUwblgzbG1lYXhZRzVSOg==',
            'Content-Type': 'application/json'
        },
        data: {
            "paymentKey": req.query.paymentKey,
            "amount": req.query.amount,
            "orderId": req.query.orderId
        }
    });


    if (response.status == 200) {
        // history에 구매내역 저장
        historyDAO.addHistory({
            status: response.data.status,
            approvatedAt: response.data.approvatedAt,
            orderId: response.data.orderId,
            orderName: response.data.orderName,
            paymentKey: response.data.paymentKey,
            totalAmount: response.data.totalAmount,
            userId: req.session._id
        });

        // 결제완료 이메일 전송
        mail.sendEmail({
            email: req.session.email,
            totalAmount: response.data.totalAmount,
            orderId: response.data.orderId
        });

        // 결제완료 메세지 전송
        res.redirect(`/v1/toss/payment/${response.data.paymentKey}`);
    } else {
        res.redirect('/v1/toss/fail');
    }
}

// 결제 성공
exports.success = (req, res) => {
    res.render('result', {
        result: '결제 성공'
    });
}

// 결제 실패
exports.fail = (req, res) => {
    res.render('result', {
        result: '결제 실패'
    });
}

// 구매목록 출력
exports.payments = async (req, res) => {
    if(!session.isVaildSession(req.session)){
        res.redirect('/v1/login');
        return;
    }

    const payments = await historyDAO.getHistoryByUserId({ userId: req.session._id });
    res.render('payments', { name: req.session.name, payments: payments });
}

// 구매내역 메세지 전송
exports.payment = async (req, res) => {
    if(!session.isVaildSession(req.session)){
        res.redirect('/v1/login');
        return;
    }

    const paymentKey = req.params.paymentKey;
    const history = await historyDAO.getHistoryByPaymentKey({paymentKey: paymentKey});
    message.sendMessage({
        phone: req.session.phone,
        name: req.session.name,
        orderId: history.orderId,
        orderName: history.orderName,
        totalAmount: history.totalAmount
    });
    
    res.redirect("/v1/toss/success");
}