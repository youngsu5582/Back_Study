const express = require('express');

const router = express.Router();

const testingRoutes = require('./test');
const postRoutes = require('./post');

router.use('/testing', testingRoutes);
router.use('/post', postRoutes);

module.exports = router;