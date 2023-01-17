const path = require('path');
const express = require('express');

const router = express.Router();
const socialLoginController = require('../controllers/social');

router.get('/', socialLoginController.loginCheck);
router.get('/logout', socialLoginController.logout);
module.exports = router;