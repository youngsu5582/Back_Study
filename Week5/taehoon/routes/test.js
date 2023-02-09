const express = require('express');

const router = express.Router();

const testController = require('../controller/test');

router.get('/', testController.getMain);
router.post('/signup', testController.postSignUp);
router.post('/login', testController.postLogin);
router.post('/logout', testController.postLogout);
router.post('/testing/testingproduct', testController.makeProduct);
module.exports = router;