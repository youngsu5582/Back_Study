const express = require('express');

const router = express.Router();

const paymentController = require('../controllers/payment');


router.get('',  paymentController.getProduct);
router.get('/success', paymentController.tossPayment);

module.exports = router;