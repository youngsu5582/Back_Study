const express = require('express');


const router = express.Router();
const naverLoginController = require('../controllers/naversocial');

router.get('/login', naverLoginController.socialLogin);
router.get('/callback',naverLoginController.socialCallback);
router.get('/userinfo', naverLoginController.getUserInfo);
module.exports = router;