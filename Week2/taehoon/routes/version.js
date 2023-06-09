const express = require('express');

const router = express.Router();

const registerRoutes = require('./register');
const loginRoutes = require('./login');
const kakaosocialRoutes = require('./kakaosocial');
const naversocialRoutes = require('./naversocial');
const socialRoutes = require('./social');
const paymentRoutes = require('./payment');

router.use('', registerRoutes);
router.use('/login', loginRoutes);
router.use('/auth/kakao', kakaosocialRoutes);
router.use('/auth/naver', naversocialRoutes);
router.use('/auth', socialRoutes);
router.use('/toss',  paymentRoutes);

module.exports = router;