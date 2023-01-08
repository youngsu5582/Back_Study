const express = require('express');
const { cookie } = require('express-validator');
const path = require('path');
const router = express.Router();
const cookieController = require('../controller/cookie');

router.get('/', cookieController.getCookies);
router.post('/login', cookieController.postCookies);
router.post('/modify', cookieController.modifyCookies);
router.post('/withdrawl', cookieController.deleteCookies);


module.exports = router;