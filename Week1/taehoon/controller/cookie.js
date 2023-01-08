const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

exports.getCookies = (req, res, next) => {
    res.status(200).json(req.cookies);
};

exports.postCookies = (req, res, next) => {
    let cookie = req.cookies['user'];
    if (!cookie) {
        cookie = res.cookie('user', 'Taehoon');
        res.status(200).json({
            message: 'created!'
        })
    }
    else {
        res.status(200).json('Hi ' + cookie);
        console.log(cookie);
    }
};

exports.modifyCookies = (req, res, next) => { 
    const user = req.body.key;
    const value = req.body.value;
    let cookie = req.cookies[user];
    console.log(cookie);
    if(!cookie){
        res.status(404).json({
            message: 'not found'
        })
    }
    cookie = res.cookie('user', value);
    res.status(200).json({
        message: 'modify success!'
    })
}

exports.deleteCookies = (req, res, next) => {
    res.clearCookie('user');
    res.status(200).json({
        message: 'deleted'
    });
};