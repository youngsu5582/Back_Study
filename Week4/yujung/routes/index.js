const router = require('express').Router();
const controller = require('../controllers');

router.post('/testing/testingUser', controller.testingUser);
router.post('/testing/testingPost', controller.testingPost);
router.get('/post/list', controller.list);
router.get('/post/search', controller.search);

module.exports = router;