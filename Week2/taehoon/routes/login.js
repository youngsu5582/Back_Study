const path = require('path');
const express = require('express');

const loginController = require('../controllers/login');
const isAuth = require('../middleware/is-auth');
const router = express.Router();

router.post('/sessionlogin', loginController.postSessionLogin);
router.post('/sessionverify', loginController.postSessionVerify);
router.post('/jwtlogin', loginController.postJwtLogin);
router.post('/jwtverify', isAuth, loginController.postJwtVerify);

module.exports = router;