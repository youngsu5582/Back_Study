const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Post = sequelize.define('post', {
    postId: {
       type: Sequelize.INTEGER,
       autoIncrement: true,
       allowNull: false,
       primaryKey: true 
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    content: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    date: Sequelize.DATE,
    views: Sequelize.INTEGER,
    like_count: Sequelize.INTEGER   
});


module.exports = Post;
