const mongoose = require('mongoose');

const Product = new mongoose.Schema({
    price: { type: String, require: true},
    name: { type: String, require: true },
    seller: { type: String, require: true }
});

module.exports = mongoose.model('Product', Product);