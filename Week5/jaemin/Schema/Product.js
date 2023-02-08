const mongoose = require("mongoose");
const {Schema} = mongoose;

const productSchema = new Schema({
    price: String,
    name: String,
    seller: String
});

module.exports = mongoose.model("Product", productSchema);