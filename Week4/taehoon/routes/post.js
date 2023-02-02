const express = require('express');

const router = express.Router();

const postController = require('../controller/post');

router.get('/list', postController.getPosts);
router.post('/search', postController.searchPost);;

module.exports = router;