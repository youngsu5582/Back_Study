const User = require("../Schema/User");
const axios = require('axios');
const History = require('../Schema/History');
const RandomString = require('../utils/RandomString');
const getRandomProduct = require('../utils/getRandomProduct');
const sendMail = require('../utils/sendMail');
const sendMessage = require('../utils/sendMessage');

exports.tossPayment = async (req, res) => {

    await getRandomProduct()
    .then(result => {
        product = result
    })
    .catch(err => console.log(err));

    const randomOrderid = await RandomString();

    res.render('index', {
        orderid : randomOrderid,
        price: product.price,
        name: product.name,
        seller: product.seller
    })
}

exports.tossPaymentSuccess = async (req,res) => {

    var orderid = req.query.orderId;
    var paymentkey = req.query.paymentKey;
    let amount = parseInt(req.query.amount);
    const base64encoding = await Buffer.from('test_sk_BE92LAa5PVb1k6O7p4W37YmpXyJj:').toString('base64');
    
    const result = await axios.post("https://api.tosspayments.com/v1/payments/confirm", {
        paymentKey: paymentkey,
        orderId: orderid,
        amount: amount
    }, {
    headers: {
        'Content-Type': 'application/json',
        'Authorization' : `Basic ${base64encoding}`
    }
    })

    const history = await new History({
        orderId: result.data.orderId,
        orderName : result.data.orderName,
        paymentKey : result.data.paymentKey,
        totalAmount : result.data.totalAmount,
        userId : req.session._id,
        status : result.data.status,
        approvedAt : result.data.approvedAt
    })
    history.save();
    await sendMail(req.session.email, result.data.totalAmount, result.data.orderId);
    res.render('succes.ejs');
}

exports.tossPaymentList = async (req, res) => {
    const result = await History.find(
        {userId : req.session._id},
        {_id:0, status:1, orderName:1, approvedAt:1, paymentKey:1}
    )
    res.send(result);
}

exports.tossPaymentSMS = async (req,res) => {
    const paymentkey = req.params.paymentKey;
    const history = await History.findOne({"paymentKey": paymentkey},{});
    const result = await User.findOne({"userId": history.userId},{});

    await sendMessage(result.phone_number, history.orderId, history.orderName, history.totalAmount);
}