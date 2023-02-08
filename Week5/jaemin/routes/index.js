const express = require("express");
const router = express.Router();
const tossController = require('../controllers/toss')
const userController = require('../controllers/user');
const testingController = require('../controllers/testing');

router.get('/', userController.home);

router.post('/register', userController.register);
router.get("/login",userController.getLogin);
router.post("/login", userController.postLogin)

router.get('/toss', tossController.tossPayment);
router.get('/success',tossController.tossPaymentSuccess);
router.get('/payments', tossController.tossPaymentList);
router.get('/toss/payment/:paymentKey', tossController.tossPaymentSMS);

router.post('/testingProduct', testingController.testingProducts);

module.exports = router;