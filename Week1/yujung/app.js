const express = require("express");
const app = express();
const http = require('http').createServer(app);

process.env.PORT = 8085;

// views static 경로 지정
app.use(express.static(__dirname+"/views"));

// body-parser
app.use(express.json());

// route
const routes = require('./routes/');
app.use(routes);

// cookie-parser
const cookieParser = require('cookie-parser');
app.use(cookieParser());

http.listen(process.env.PORT, () => {
    console.log("8085번 포트에서 서버 대기중입니다.");
});