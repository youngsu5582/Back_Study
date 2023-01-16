const express = require('express');
const path = require('path');

const router = express.Router();

const socialLoginController = require('../controllers/social');

router.get('/v1/auth', socialLoginController.socialLogin);
router.get('/v1/auth/callback',socialLoginController.socialCallback);
router.get('/v1/auth/userinfo', socialLoginController.getTokenInfo);

module.exports = router;