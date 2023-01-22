const fs = require('fs');
const address = "\\Back_Study\\Week3\\taehoon";
const convert = require('xml-js');
const csv = require('csvtojson');
const yaml = require('js-yaml');
const exifr = require('exifr');


exports.postJson = (req, res, next) => {
    const filePath = address + req.body.path + '.json';
    //console.log(filePath);
    try {
        const jsonFile = fs.readFileSync(filePath, 'utf-8');
        res.status(200).json({
            status: "ok",
            message: JSON.parse(jsonFile)
        })
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 404;
            err.message = "Not Found"
        }
        next(err);
    }
};

exports.postXml = (req, res, next) => {
    const filePath = address + req.body.path + '.xml';
    try {
        const xmlFile = fs.readFileSync(filePath, 'utf-8');
        let xmlToJson = convert.xml2json(xmlFile, { compact: true, spaces: 4 });
        const Xml = JSON.parse(xmlToJson);
        res.status(200).json({
            status: "ok",
            body: Xml.catalog
        })
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 404;
            err.message = "Not Found"
        }
        next(err);
    }
};

exports.postCsv = async (req, res, next) => {
    const filePath = address + req.body.path + '.csv';
    //console.log(filePath);  
    try {
        const jsonObj = await csv().fromFile(filePath);
        //filePath대신 ./public/Csv.csv도 가능
        res.status(200).json({
            status: "ok",
            body: jsonObj
        })
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 404;
            err.message = "Not Found"
        }
        next(err);
    }

};

exports.postYaml = (req, res, next) => {
    const filePath = address + req.body.path + '.yaml';
    //console.log(filePath);
    try {
        const yamlFile = fs.readFileSync(filePath, 'utf8');
        const jsonObj = yaml.load(yamlFile);
        res.status(200).json({
            status: "ok",
            body: jsonObj
        })
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.postExif = async (req, res, next) => {
    let filePath = address + req.body.path;
    try {
        const exifData = await exifr.parse(filePath);
        res.status(200).json({
            status: "ok",
            body:{
                make: exifData.Make,
                latitude: exifData.latitude,
                longitude: exifData.longitude
            }
        })
    }
    catch(err){
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};