const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
    price: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    seller: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Product', productSchema);