const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Post = sequelize.define('post', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    content: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    views: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    like_count: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    userId: {
        type: Sequelize.INTEGER,
        references: {
            model: 'users',
            key: 'id',
        }
    }
});

module.exports = Post;