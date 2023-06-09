const axios = require('axios');
require("dotenv").config();
let access_Token;
exports.socialLogin = (req, res, next) => {
    if (req.session.isloggedIn) {
        res.redirect('/v1/auth');
    }
    res.redirect(`https://kauth.kakao.com/oauth/authorize?client_id=${process.env.S_API_KEY}&redirect_uri=${process.env.S_REDIRECT_URI}&response_type=code`);
};

exports.socialCallback = async (req, res, next) => {
    const token = req.query.code;
    try {
        const access = await axios.post('https://kauth.kakao.com/oauth/token',
            {}, {
            params:
            {
                grant_type: "authorization_code",
                client_id: process.env.S_API_KEY,
                redirect_uri: process.env.S_REDIRECT_URI,
                code: token
            },
            headers:
                { 'Content-type': 'application/x-www-form-urlencoded' }
        });
        access_Token = access.data.access_token;
        res.redirect('/v1/auth/kakao/userinfo');
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
            next(err);
        }
    }
};

exports.getTokenInfo = async (req, res, next) => {
    url = "https://kapi.kakao.com/v2/user/me";
    header = {
        "Authorization": `Bearer ${access_Token}`
    }
    try {
        const author = await axios.get(url, { headers: header });
        const email = author.data.kakao_account.email;
        req.session.email = email;
        req.session.name = 'KAKAO';
        req.session.isloggedIn = true;
        res.redirect('/v1/login/makeProduct');
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
            next(err);
        }
    }
};