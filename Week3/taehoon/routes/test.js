const express = require('express');

const router = express.Router();

const testController = require('../controller/test');

router.post('/testinguser', testController.createUserData);
router.post('/testingpost', testController.createPostData);


module.exports = router;