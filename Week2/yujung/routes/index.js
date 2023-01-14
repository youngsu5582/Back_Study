const router = require('express').Router();
const controller = require('./controller.js');

router.post('/v1/register', controller.register);
router.post('/v1/jwtLogin', controller.jwtLogin);
router.post('/v1/jwtVerify', controller.jwtVerify);
router.post('/v1/sessionLogin', controller.sessionLogin);
router.post('/v1/sessionVerify', controller.sessionVerify);

module.exports = router;