const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            email: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            password: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW
            },
            updatedAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW
            }
        }, {
            sequelize, // static init의 매개변수와 연결되는 옵션
            timestamps: false, // 자동으로 날짜 컬럼을 추가하는 옵션
            modelName: 'User',
            tableName: 'user',
            paranoid: false, // deletedAt 컬럼을 생성하는 옵션
            charset: 'utf8', // 한글 설정
            collate: 'utf8_general_ci', // 한글 설정
        });
    }
    static associate() {

    }
}