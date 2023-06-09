const express = require('express');

const router = express.Router();
const socialLoginController = require('../controllers/social');
const isAuth = require('../middleware/is-auth');
router.get('/', socialLoginController.loginCheck);
router.post('/logout', socialLoginController.logout);
module.exports = router;