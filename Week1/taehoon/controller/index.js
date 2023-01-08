const path = require('path');

exports.getIndex = (req, res, next) => {
    res.render('index', {
        pageTitle: 'index',
        path: '/index'
    });
};

exports.postIndex = (req, res, next) => {
    console.log('Post Index');
    res.status(200).json("hi postman");
}