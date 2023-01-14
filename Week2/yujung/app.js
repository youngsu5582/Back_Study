const express = require('express');
const app = express();
const http = require('http').createServer(app);
const session = require('express-session'); // 세션 관리용 미들웨어
const MySQLStore = require('express-mysql-session')(session);
require("dotenv").config(); // .env 파일사용

// sequelize
// models/index.js의 db.sequelize를 불러옴
// sync 메서드를 사용해 서버 실행 시 MySQL과 연동
const { sequelize } = require("./models");
sequelize.sync({ force: false }) // 서버 실행 시마다 테이블 재생성 옵션
    .then(() => {
        console.log("데이터베이스 연결 성공");
    })
    .catch((err) => {
        console.err(err);
    });


// session
const options = {
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    user: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
};
const sessionOptions = {
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    store: new MySQLStore(options),
    cookie: {
        maxAge: process.env.COOKIE_MAXAGE,
    },
};
app.use(session(sessionOptions));

// body-parser
app.use(express.json());

// router
const router = require('./routes/');
app.use(router);

http.listen(process.env.PORT, () => {
    console.log(process.env.PORT + '번 포트에서 서버 대기중입니다.');
});

