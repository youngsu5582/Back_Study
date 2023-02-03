const express = require('express');
const sqlController = require('../controllers/sql');
const router = express.Router();

router.post('/v1/testing/testingUser', sqlController.makeTestingUsers);
router.post('/v1/testing/testingPost', sqlController.makeTestingPosts);
router.get('/v1/post/list', sqlController.getPostData);
router.get('/v1/post/search', sqlController.searchPostData);

module.exports = router;