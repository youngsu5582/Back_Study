const express = require('express');

const router = express.Router();

const kakaoLoginController = require('../controllers/kakaosocial');

router.get('/login', kakaoLoginController.socialLogin);
router.get('/callback',kakaoLoginController.socialCallback);
router.get('/userinfo', kakaoLoginController.getTokenInfo);

module.exports = router;