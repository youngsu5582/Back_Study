const express = require('express');

const router = express.Router();

const registerRoutes = require('./register');
const loginRoutes = require('./login');
const kakaosocialRoutes = require('./kakaosocial');
const naversocialRoutes = require('./naversocial');
const socialRoutes = require('./social');

router.use('', registerRoutes);
router.use('/login', loginRoutes);
router.use('/auth/kakao', kakaosocialRoutes);
router.use('/auth/naver', naversocialRoutes);
router.use('/auth', socialRoutes);

module.exports = router;