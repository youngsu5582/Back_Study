const express = require('express');

const loginController = require('../controllers/login');
const isAuth = require('../middleware/is-auth');
const router = express.Router();

router.post('/sessionlogin', loginController.postSessionLogin);
router.post('/sessionverify', loginController.postSessionVerify);
router.get('/makeProduct', loginController.makeProduct);
module.exports = router;