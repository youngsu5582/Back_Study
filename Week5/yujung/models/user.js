const mongoose = require('../database');

const User = new mongoose.Schema({
    name: { type: String, require: true},
    email: { type: String, unique: true, require: true},
    password: { type: String, require: true},
    phone: {type: String, require: true}
});

module.exports = mongoose.model('User', User);

