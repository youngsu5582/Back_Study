require('dotenv').config();
const Post = require('../models/post');
const Sequelize = require('sequelize');
exports.getPosts = async (req, res, next) => {
    const type = req.query.type;
    const count = parseInt(req.query.number);
    const recent = "recent";
    const most = "most";
    try {
        if (type === recent) {
            const posts = await Post.findAll({
                order: [
                    ["createdAt", "DESC"]
                ],
                limit: count
            });
            if (!posts) {
                const error = new Error("No Post!");
                error.statusCode = 404;
                throw error;
            }
            res.status(200).json(posts);
        }
        else if (type === most) {
            const posts = await Post.findAll({
                order: [
                    ["like_count", "DESC"]
                ],
                limit: count
            });
            if (!posts) {
                const error = new Error("No Post!");
                error.statusCode = 404;
                throw error;
            }
            res.status(200).json(posts);
        }
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.searchPost = async (req, res, next) => {
    const type = req.query.type;
    const text = req.query.text;
    try {
        if(type==="title"){
            let posts = await Post.findAll({
                where: {
                    title: {
                        [Sequelize.Op.like]: `%${text}%`
                    }
                }
            });
            res.status(200).json(posts);
        }
        else if(type==="content"){
            let posts = await Post.findAll({
                where: {
                    content: {
                        [Sequelize.Op.like]: `%${text}%`
                    }
                }
            });
            res.status(200).json(posts);
        }
        else if(type==="writer"){
            let posts = await Post.findAll({
                where: {
                    userId: {
                        [Sequelize.Op.like]: `%${text}%`
                    }
                }
            });
            res.status(200).json(posts);
        }
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};