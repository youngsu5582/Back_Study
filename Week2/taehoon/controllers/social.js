require('dotenv').config();
const User = require('../models/user');
exports.loginCheck = async(req, res, next) => {
    console.log(req.session);
    if (!req.session.email) {
        res.render('login',{
            isloggedIn: req.session.isloggedIn
        });
    }
    else {
        res.render('login',{
            isloggedIn: req.session.isloggedIn
        });
    }
}

exports.logout = (req, res, next) => {
    req.session.isloggedIn=false;
    req.session.destroy(() => {
        req.session;
    });
    res.redirect('/v1/auth');
}