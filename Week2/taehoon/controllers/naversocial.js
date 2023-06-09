const express = require('express');
const request = require('request');
require('dotenv').config();
const client_id = process.env.NAVER_ID;
const client_secret = process.env.NAVER_SECRET_KEY;
let state = "RAMDOM_STATE";
let redirectURI = process.env.NAVER_REDIRECT_URI;
let access_Token;

exports.socialLogin = (req, res, next) => {
    if (req.session.isloggedIn) {
        res.redirect('/v1/auth');
    }
    else{
    api_url = 'https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=' + client_id + '&redirect_uri=' + redirectURI + '&state=' + state;
    res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
    res.end("<a href='" + api_url + "'><img height='50' src='http://static.nid.naver.com/oauth/small_g_in.PNG'/></a>");
    }
}

exports.socialCallback = (req, res, next) => {
    code = req.query.code;
    state = req.query.state;
    // 토큰얻어오기
    api_url = 'https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id='
        + client_id + '&client_secret=' + client_secret + '&redirect_uri=' + redirectURI + '&code=' + code + '&state=' + state;
    let options = {
        url: api_url,
        headers: { 'X-Naver-Client-Id': client_id, 'X-Naver-Client-Secret': client_secret }
    };
    request.get(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            access_Token = JSON.parse(body).access_token;
            //console.log(access_Token);
            res.redirect('/v1/auth/naver/userinfo');
        } else {
            res.status(response.statusCode).end();
            console.log('error = ' + response.statusCode);
        }
    });
}

exports.getUserInfo = (req, res, next) => {
    const header = "Bearer " + access_Token;
    var api_url = 'https://openapi.naver.com/v1/nid/me';
    var options = {
        url: api_url,
        headers: {'Authorization': header}
     };
    request.get(options, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        const email = JSON.parse(body).response.email;
        req.session.email = email;
        req.session.name = 'NAVER';
        res.redirect('/v1/login/makeProduct');
      } else {
        console.log('error');
        if(response != null) {
          res.status(response.statusCode).end();
          console.log('error = ' + response.statusCode);
        }
      }
    });
    req.session.isloggedIn = true;
}