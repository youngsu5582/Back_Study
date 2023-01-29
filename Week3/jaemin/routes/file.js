const express = require('express');
const converterController = require('../controllers/converter');
const router = express.Router();

router.post('/v1/files/json', converterController.postJsonFile);
router.post('/v1/files/xml',converterController.postXmlFile);
router.post('/v1/files/csv', converterController.postCsvFile);
router.post('/v1/files/yaml', converterController.postYamlFile);
router.post('/v1/files/exif', converterController.postExifFile);

module.exports = router;

