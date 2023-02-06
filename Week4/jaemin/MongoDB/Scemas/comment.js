const mongoose = require('mongoose');
const { Schema } = mongoose;
const User = require('./index');
 
const commentSchema = new Schema({
    content: String,
    author: String,
    date: Date,
    postId: String
});

module.exports = mongoose.model('Comment', commentSchema);