const Sequelize = require('sequelize');
const User = require('./user');

//const config = require("../config/config")[process.env.NODE_ENV]; // config/config.json 사용
const config = require('../config')[process.env.NODE_ENV]; // config/index.js 사용 (.env)
const db = {};

// MySQL 연결 객체 생성
const sequelize = new Sequelize(config.database, config.username, config.password, config);
db.sequelize = sequelize;

// MySQL 연결 객체에 모델 저장
db.User = User;

// 각 모델의 static.int 메서드 호출 => 테이블과 모델이 연결
User.init(sequelize);

module.exports = db;