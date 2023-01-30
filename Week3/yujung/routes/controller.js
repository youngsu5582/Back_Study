const path = require('path');
const fs = require('fs');
const xmlconvert = require('xml-js');
const csvconvert = require('csvtojson');
const yamlconvert = require('js-yaml');
const EXIFReader = require('exifreader');

exports.json = (req, res) => {
    const jsonFilePath = path.join('.', `${req.body.path}.json`);
    const jsonFile = fs.readFileSync(jsonFilePath);
    const jsonObj = JSON.parse(jsonFile);
    res.status(200).json({
        status: "ok",
        body: jsonObj
    });
}

exports.xml = (req, res) => {
    const xmlFilePath = path.join('.', `${req.body.path}.xml`);
    const xmlFile = fs.readFileSync(xmlFilePath);
    const xmltojson = xmlconvert.xml2json(xmlFile, { compact: true, spaces: 4 });
    const jsonObj = JSON.parse(xmltojson);
    res.status(200).json({
        status: "ok",
        body: jsonObj
    });
}

exports.csv = (req, res) => {
    const csvFilePath = path.join('.', `${req.body.path}.csv`);
    csvconvert().fromFile(csvFilePath).then(jsonObj => {
        res.status(200).json({
            status: "ok",
            body: jsonObj
        });
    });

}

exports.yaml = (req, res) => {
    const yamlFilePath = path.join('.', `${req.body.path}.yaml`);
    const yamlFile = fs.readFileSync(yamlFilePath);
    const jsonObj = yamlconvert.load(yamlFile);
    res.status(200).json({
        status: "ok",
        body: jsonObj
    });
}

exports.exif = (req, res) => {
    const exifFilePath = path.join('.', `${req.body.path}`);
    const exifFile = fs.readFileSync(exifFilePath);
    const tags = EXIFReader.load(exifFile, {
        expanded: true,
        includeUnknown: true
    });
    res.status(200).json({
        status:200,
        body: {
            "Make": tags.exif.Make.description,
            "latitude": tags.exif.GPSLatitude.description,
            "longitude": tags.exif.GPSLongitude.description,
        }
    });

}