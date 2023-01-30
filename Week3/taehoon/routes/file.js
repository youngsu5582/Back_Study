const path = require('path');
const express = require('express');

const router = express.Router();
const fileController = require('../controller/file');

router.post('/json', fileController.postJson);
router.post('/xml', fileController.postXml);
router.post('/csv', fileController.postCsv);
router.post('/yaml', fileController.postYaml);
router.post('/exif', fileController.postExif);

module.exports = router;