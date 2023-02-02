const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Comment = sequelize.define('comment', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    content: {
        type: Sequelize.STRING,
        allowNull: false
    },
    author: {
        type: Sequelize.INTEGER,
        references: {
            model: 'users',
            key: 'id',
        },
        allowNull: false
    },
    postId: {
        type: Sequelize.INTEGER,
        references: {
            model: 'posts',
            key: 'id',
        }
    }
});

module.exports = Comment;