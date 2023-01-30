const { sequelize } = require('./models');

sequelize.sync({ force: true }) // 서버 실행 시마다 테이블 재생성 옵션
    .then(() => {
        console.log("데이터베이스 연결 성공");
    })
    .catch((err) => {
        console.err(err);
    });