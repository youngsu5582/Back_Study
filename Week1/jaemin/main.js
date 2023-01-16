const express = require('express') // express module
const app = express() // new express app
const port = 4000 // port
const bodyParser = require('body-parser')
const cookies = require('cookie-parser')

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cookies())

app.get('/', (req, res) => res.send('Hello World'))

// HTML 파일 전송
app.get('/v1/index/', (req, res) => {
    res.sendfile("./lib/template.html");
})

// POSTMAN
app.post('/v1/index/', (req, res) => {
    console.log("Hi Postman");
    res.json("Hi Postman!");
})

// 저장된 쿠키 가져오기
app.get('/v1/cookie', (req, res) => {
    res.json(req.cookies);
})

// User 쿠키 생성
app.post('/v1/cookie/login', (req, res) => {
    var cookieKey = req.body.user;
    if(req.cookies.user) {
        res.send(`HI ${req.cookies.user}`);
    }else {
        res.cookie('user', cookieKey);
        res.send("Cookie Set!");
    }
})

// 쿠키 수정 및 생성
app.post('/v1/cookie/modify', (req, res) => {
    var content = req.body;
    var cokkey = content.key;
    var cokval = content.value;
    var ckeckcnt = 0;
    for(key in req.cookies) {
        if(key == cokkey) {
            res.cookie(cokkey, cokval, {overwrite:true});
            res.send("쿠키 수정완료!");
        }else {
            ckeckcnt++;
        }
    }
    if(ckeckcnt == (Object.keys(req.cookies).length)) {
        res.cookie(cokkey, cokval);
        res.send("쿠키 생성완료!");
    }
})

// 쿠키 삭제
app.post('/v1/cookie/withdrawl', (req, res) => {
    cok = req.body;
    ckeckcnt = 0;
    coki = Object.values(cok);
    for(key in req.cookies) {
        if(key == coki) {
            res.clearCookie(key);
            res.send("withdrawl!");;
        }else {
            ckeckcnt++;
        }
    }
    if(ckeckcnt == Object.keys(req.cookies).length) {
        res.send("Not Cookie!!");
    }
})

app.listen(port, () => console.log(`Example app listening on port ${port}`))