const Product = require('../Schema/Product');

getRandomProduct = async function () {
    const count = await Product.countDocuments();
    const random = Math.floor(Math.random() * count);
    return Product.findOne().skip(random)
}

module.exports = getRandomProduct;