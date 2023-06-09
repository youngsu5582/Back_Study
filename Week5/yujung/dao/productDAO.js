const Product = require('../models/product')

exports.setSeedProduct = async (param) => {
    await Product.deleteMany({});
    await Product.insertMany(param);
}

exports.getRandomProduct = async () => {
    const totalCount = await Product.count();
    const skipsize = Math.floor(Math.random() * totalCount);
    return await Product.find().skip(skipsize).limit(1);
}

exports.selectProduct = async () => {
    return await Product.find({});
}
