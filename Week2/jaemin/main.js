const express = require('express') // express module
const app = express() // new express app
const port = 4000 // port
const bodyParser = require('body-parser');
const cookies = require('cookie-parser');
const db = require('./database.js');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const jwt = require('jsonwebtoken');
const axios = require('axios');
const mysql = require('mysql2/promise');
require("dotenv").config("/jaemin");

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cookies())

const REST_API_KEY = process.env.REST_API_KEY;
const REDIRECT_URI = process.env.REDIRECT_URI;
const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

var options = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'jaemin5548',
    database: 'backstudy'
};

var sessionStore = new MySQLStore(options);

app.use(
    session({
        key: "secretkey",
        secret: "secretkey",
        store: sessionStore,
        resave: false,
        saveUninitialized: false,
    })
)

let connection = mysql.createPool(options);
var sessionStore = new MySQLStore({}, connection);

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.post('/v1/register', (req, res) => {
    var email = req.body.email;
    var password = req.body.password;

    db.execute(`select exists (select * from user where email = '${email}') AS chk LIMIT 1;`).then((result, data) => {
        if(result[0][0].chk === 1) {
            res.json("이미 있음");
        }else {
            db.execute('insert into user (email, password) values (?,?)', [email, password])
            .then(() => {
                res.json("생성!");
            })
            .catch(err => {
                console.log(err);    
            });
            }
    }).catch((err) => {
        console.log(err);
    })
})


app.post('/v1/login/jwtLogin', (req, res) => {
    var email = req.body.email;
    var password = req.body.password;

    db.execute(`select exists (select * from user where email = '${email}' AND password ='${password}') AS chk;`).then((result, data) => {
        var token;
        if(result[0][0].chk === 1) {
            token = jwt.sign({
                email
            },
            "secretkey",
            {
                algorithm : "HS256",
                subject: "Jaemin jwtToken",
                expiresIn: '60m',
                issuer: "WooJJam"
            });
            // req.session.save();
            // console.log(req.session);
            res.json(token);
        }else {
            res.json("일치하는 ID나 비밀번호가 존재하지 않습니다.");
        }
    })
})

app.post('/v1/login/jwtVerify', (req, res) => {
    user = jwt.verify(req.headers.authorization, "secretkey");
    res.json(user.email);
})

app.post('/v1/login/sessionLogin', (req, res) => {
    var email = req.body.email;
    var password = req.body.password;
    db.execute(`select exists (select * from user where email = '${email}' AND password = '${password}') AS chk;`)
    .then((result, data) => {
        if(result[0][0].chk === 1) {
            req.session.email = email;
            req.session.save(function() {
                res.json("login Complete!");
            });
        }else {
            res.json("Login Failed!");
            }
        })
})

app.post('/v1/login/sessionVerify', (req, res) => {
    res.json(req.session.email);
})

app.get('/v1/auth', (req, res) => {
    if(req.session.email) {
        res.send(req.session.email);
    }else {
        res.status(200).send(`<a href = ${KAKAO_AUTH_URL}>카카오 로그인</a>`);
    }
})

app.get('/auth/kakao/callback', async (req, res) => {
    const code = req.query.code;
    const token = await axios.post('https://kauth.kakao.com/oauth/token', {}, {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        params:{
            grant_type: 'authorization_code',
            client_id: REST_API_KEY,
            code,
            redirect_uri : "http://localhost:4000/auth/kakao/callback"
        }
    })

    const userInfo = await axios.post('https://kapi.kakao.com/v2/user/me', {}, {
        headers: {
            "Content-Type" : "application/x-www-form-urlencoded;charset",
            'Authorization': 'Bearer ' + token.data.access_token
        }
    });
    if(userInfo.data.kakao_account.email){
        req.session.email = userInfo.data.kakao_account.email;
        req.session.save(function() {
            res.redirect("https://cs.kakao.com/");
        });
    }
})

app.listen(port, () => console.log(`Example app listening on port ${port}`))