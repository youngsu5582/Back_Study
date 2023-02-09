const express = require('express');

const router = express.Router();

const paymentController = require('../controller/payment');

const isAuth = require('../middleware/is-auth');
router.get('/v1/toss', isAuth, paymentController.getProduct);
router.get('/v1/toss/payments', isAuth, paymentController.getHistory);
router.get('/v1/toss/payment/:paymentKey', isAuth, paymentController.postSMS);
router.get('/success', isAuth, paymentController.tossPayment);

module.exports = router;