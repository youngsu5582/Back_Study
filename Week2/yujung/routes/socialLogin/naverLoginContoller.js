require('dotenv').config();
const client_id = process.env.NAVER_CLIENT_ID;
const client_secret = process.env.NAVER_CLIENT_SECRET;
const redirectURI = encodeURI(process.env.NAVER_REDIRECT_URI);
var state = "RAMDOM_STATE";
var token;

exports.naverLogin = (req, res) => {
    api_url = 'https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=' + client_id + '&redirect_uri=' + redirectURI + '&state=' + state;
    res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
    res.end("<a href='" + api_url + "'><img height='50' src='http://static.nid.naver.com/oauth/small_g_in.PNG'/></a>");
};

exports.naverCallback = (req, res) => {
    // 인가 코드
    code = req.query.code;
    state = req.query.state;

    // 토큰
    api_url = 'https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id='
        + client_id + '&client_secret=' + client_secret + '&redirect_uri=' + redirectURI + '&code=' + code + '&state=' + state;
    var request = require('request');
    var options = {
        url: api_url,
        headers: { 'X-Naver-Client-Id': client_id, 'X-Naver-Client-Secret': client_secret }
    };
    request.get(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            token = JSON.parse(body).access_token;;
            res.redirect('/v1/auth/naver/member');
        } else {
            res.status(response.statusCode).end();
            console.log('error = ' + response.statusCode);
        }
    });
}

exports.naverMember = (req, res) => {
    const header = "Bearer " + token;

    const api_url = 'https://openapi.naver.com/v1/nid/me';
    const request = require('request');
    const options = {
        url: api_url,
        headers: { 'Authorization': header }
    };
    request.get(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            const email = JSON.parse(body).response.email;
            req.session.email = email;

            res.redirect('/v1/auth');
        } else {
            console.log('error');
            if (response != null) {
                res.status(response.statusCode).end();
                console.log('error = ' + response.statusCode);
            }
        }
    });
}