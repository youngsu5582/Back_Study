const axios = require('axios');
require("dotenv").config()
let access_Token;
exports.socialLogin = (req, res, next) => {
    if (!req.session.email) {
        res.redirect(`https://kauth.kakao.com/oauth/authorize?client_id=${process.env.S_API_KEY}&redirect_uri=${process.env.S_REDIRECT_URI}k/&response_type=code`);
    }
    else res.status(200).json(`이미 ${req.session.email}로 로그인됨`);
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
        console.log(access);
        res.redirect('/v1/auth/userinfo');
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
            next(err);
        }
    }
};

exports.getTokenInfo = async (req, res, next) => {
    url = "https://kapi.kakao.com/v2/user/me";
    console.log(req.session)
    header = {
        "Authorization": `Bearer ${access_Token}`
    }
    try {
        const author = await axios.get(url, { headers: header });
        const email = author.data.kakao_account.email;
        req.session.email = email;
        res.status(200).json(email);
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
            next(err);
        }
    }
};