const router = require('express').Router();
const controller = require('./controller');

router.post('/json', controller.json);
router.post('/xml', controller.xml);
router.post('/csv', controller.csv);
router.post('/yaml', controller.yaml);
router.post('/exif', controller.exif);

module.exports = router;