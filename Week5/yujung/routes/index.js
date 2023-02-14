const router = require('express').Router();
const loginCntrlr = require('../controllers/loginCtrlr');
const testingCtrlr = require('../controllers/testingCtrlr')
const shoppingCtrlr = require('../controllers/shoppingCtrlr')

// login
router.get("/login", loginCntrlr.login)
router.post("/login", loginCntrlr.login);
router.get("/signup", loginCntrlr.signup);
router.post("/signup", loginCntrlr.signup);
router.get("/logout", loginCntrlr.logout);

// toss
router.get("/toss", shoppingCtrlr.toss);
router.get("/toss/pay", shoppingCtrlr.pay);
router.get("/toss/success", shoppingCtrlr.success);
router.get("/toss/fail", shoppingCtrlr.fail);
router.get("/toss/payment/:paymentKey", shoppingCtrlr.payment);

// history
router.get("/toss/payments", shoppingCtrlr.payments);

// testing
router.post("/testing/testingProduct", testingCtrlr.testingProduct);
router.get("/testing/user/select", testingCtrlr.selectUser);
router.get("/testing/user/delete", testingCtrlr.deleteUser);
router.get("/testing/history/select", testingCtrlr.selectHistory);
router.get("/testing/history/delete", testingCtrlr.deleteHistory);

module.exports = router;