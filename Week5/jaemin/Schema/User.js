const mongoose = require('mongoose');
const { Schema } = mongoose;
 
const userSchema = new Schema({
    name: String,
    password: String,
    email: String,
    phone_number: String
});

module.exports = mongoose.model('User', userSchema);