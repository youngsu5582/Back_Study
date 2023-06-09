const express = require('express');

const router = express.Router();

const paymentController = require('../controller/payment');

const isAuth = require('../middleware/is-auth');

router.get('/v1/toss',  paymentController.getProduct);
router.get('/v1/toss/payments',  paymentController.getHistory);
router.get('/v1/toss/payment/:paymentKey', paymentController.postSMS);
router.get('/success', paymentController.tossPayment);

module.exports = router;