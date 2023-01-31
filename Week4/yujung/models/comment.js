const Sequelize = require('sequelize');

module.exports = class Comment extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                commentId: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                },
                content: {
                    type: Sequelize.STRING(200),
                    allowNull: false,
                },
                author: {
                    type: Sequelize.STRING(20),
                    allowNull: false,
                },
            }, {
            sequelize,
            modelName: "Comment",
            tableName: "comment",
            charset: 'utf8', // 한글 설정
            collate: 'utf8_general_ci', // 한글 설정
        })
    }

    static associate(db) {
            db.Comment.belongsTo(db.Post, {foreignKey: 'postId', targetKey: 'postId', onDelete:'cascade', onUpdate:'cascade'});
    }
}