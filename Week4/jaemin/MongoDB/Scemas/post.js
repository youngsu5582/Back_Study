const mongoose = require('mongoose');
const { Schema } = mongoose;
const User = require('./index');
 
const postSchema = new Schema({
    title : {
        type: String
    },
    content : {
        type: String
    },
    date: { 
        type: Date
    },
    views: {
        type: Number
    },
    like_count: {
        type: Number
    },
    owner: {
      type: String
    }
});

module.exports = mongoose.model('Post', postSchema);