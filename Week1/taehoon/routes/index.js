const express = require('express');
const path = require('path');
const router = express.Router();
const indexController = require('../controller/index');

router.get('/index', indexController.getIndex);
router.post('/index', indexController.postIndex);




module.exports = router;