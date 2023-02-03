const Post = require('../models/post');
const Sequelize = require('sequelize');

async function addPost(title, content, date, views, like_count, memberId) {
    await await Post.create({
        title: title,
        content: content,
        date: date,
        views: views,
        like_count: like_count,
        memberId: memberId,
    });
}

async function findPostMost(count) {
    return await Post.findAll({
            order: [
                ["views", "DESC"],
            ],
            limit: count,
            raw: true,
        });
};

async function findPostRecent(count) {
    return await Post.findAll({
            order: [
                ["date", "DESC"],
            ],
            limit: count,
            raw: true,
        });
};

async function findPostByTitle(text) {
    return await Post.findAll({
            where: {
                title: {
                    [Sequelize.Op.like]: `%${text}%`
                }
            },
            raw: true,
        });
};

async function findPostByContent(text) {
    return await Post.findAll({
            where: {
                content: {
                    [Sequelize.Op.like]: `%${text}%`
                }
            },
            raw: true,
        });
};

async function findPostByWriter(text) {
    return await Post.findAll({
            where: {
                memberId: parseInt(text)
            },
            raw: true,
        });
};

module.exports ={
    addPost,
    findPostMost,
    findPostRecent,
    findPostByTitle,
    findPostByContent,
    findPostByWriter,
};