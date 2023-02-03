const Sequelize = require('sequelize');
const Member = require('./member');
const Post = require('./post');
const Comment = require('./comment');
require('dotenv').config();

const config = require("../config/config")[process.env.NODE_ENV]; // config/config.json 사용
const db = {};

// MySQL 연결 객체 생성
const sequelize = new Sequelize(config.database, config.username, config.password, config);
db.sequelize = sequelize;

// MySQL 연결 객체에 모델 저장
db.Member = Member;
db.Post = Post;
db.Comment = Comment;

// 각 모델의 init 메서드 호출 => 테이블과 모델이 연결
Member.init(sequelize);
Post.init(sequelize);
Comment.init(sequelize);

// 각 모델의 associate 메서드 호출 => 테이블 간 관계 설정
Member.associate(db);
Post.associate(db);
Comment.associate(db);

module.exports = db;