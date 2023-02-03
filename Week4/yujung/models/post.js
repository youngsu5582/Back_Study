const Sequelize = require('sequelize');
const db = require('../models');

module.exports = class Post extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                postId: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                },
                title: {
                    type: Sequelize.STRING(255),
                },
                content: {
                    type: Sequelize.TEXT,
                },
                date: {
                    type: Sequelize.DATE,
                    defaultValue: Sequelize.NOW,
                },
                views: {
                    type: Sequelize.INTEGER,
                    defaultValue: 0,
                },
                like_count: {
                    type: Sequelize.INTEGER,
                    defaultValue: 0,
                }
            }, {
            sequelize,
            modelName: "Post",
            tableName: "post",
            charset: 'utf8', // 한글 설정
            collate: 'utf8_general_ci', // 한글 설정
        })
    }

    static associate(db) {
        db.Post.belongsTo(db.Member, {foreignKey:'memberId', targetKey:'memberId', onDelete: 'cascade', onUpdate: 'cascade'});
        db.Post.hasMany(db.Comment, {foreignKey:'postId', sourceKey:'postId', onDelete: 'cascade', onUpdate: 'cascade'});
    }
}