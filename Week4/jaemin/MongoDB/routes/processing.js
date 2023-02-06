const express = require('express');
const router = express.Router();
const mongooseController = require('../controllers/mongoose');

router.get('/', (req,res) => {
    res.send("hello");
})
router.post('/testingusers', mongooseController.makeTestingUsers)
router.post('/testingposts', mongooseController.makeTestingPosts)
router.get('/list', mongooseController.getPostData);
router.get('/search', mongooseController.searchPostData);

module.exports = router;