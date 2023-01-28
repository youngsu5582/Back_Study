const fs = require('fs');
const xmlToJson = require('xml-js');
const csvToJson = require('csvtojson');
const yamlToJson = require('js-yaml');
const ExifReader = require('exifreader');

exports.postJsonFile = (req, res) => {
    var jsonpath = '.' + req.body.path;
    const jsonfile = fs.readFileSync(jsonpath, 'utf8')
    res.status(200).json({
        status: "ok",
        body: jsonfile
    })
}

exports.postXmlFile =  (req, res) => {
    var xmlpath =  '.' + req.body.path;
    const xmlfile = fs.readFileSync(xmlpath, 'utf8');
    var result = xmlToJson.xml2json(xmlfile, {compact: true, spaces: 4});
    res.status(200).json({
        status: "ok",
        body: JSON.parse(result)
    })
}

exports.postCsvFile = (req, res) => {
    var csvpath = '.' + req.body.path;
    csvToJson()
    .fromFile(csvpath)
    .then(csvfile => {
       res.status(200).json({
        status:"ok",
        body: csvfile
       })
    })
    .catch(err =>{
        res.json(err);
    }) 
}

exports.postYamlFile = (req, res) => {
    var yamlpath = '.' + req.body.path;
    const yamlfile = yamlToJson.load(fs.readFileSync(yamlpath, 'utf8'));
    res.status(200).json({
        status:200,
        body: yamlfile
    });
}

exports.postExifFile = (req, res) => {
    var exifpath = '.' + req.body.path;
    var exiffile = fs.readFileSync(exifpath);
    const tags = ExifReader.load(exiffile, {expanded: true});
    res.status(200).json({
        status:200,
        body: {
            "make" : tags.exif.Make.description,
            "latitude" : tags.gps.Latitude,
            "longitude" : tags.gps.Longitude,
        }
    });
}