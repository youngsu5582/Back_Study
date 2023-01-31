const Sequelize = require('sequelize');

module.exports = class Member extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            memberId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            email: {
                type: Sequelize.STRING(50),
                allowNull: false,
            },
            password: {
                type: Sequelize.STRING(50),
                allowNull: false,
            }
        },{
            sequelize,
            modelName: "Member",
            tableName: 'member',
            charset: 'utf8', // 한글 설정
            collate: 'utf8_general_ci', // 한글 설정
        })
    }

    static associate(db) {
            db.Member.hasMany(db.Post, {foreignKey:'memberId', sourceKey:'memberId', onDelete: 'cascade', onUpdate: 'cascade'});
    }
}