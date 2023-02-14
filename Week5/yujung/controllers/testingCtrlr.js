const { faker } = require('@faker-js/faker');
const uesrDAO = require('../dao/userDAO');
const productDAO = require('../dao/productDAO');
const historyDAO = require('../dao/historyDAO');

exports.testingProduct = async (req, res) => {
    const seed = req.body.seed;
    faker.seed(seed);

    const products = new Array();
    for (var i = 0; i < 100; i++) {
        const product = {};
        product.price = faker.datatype.number();
        product.name = faker.commerce.product();
        product.seller = faker.internet.userName();
        products.push(product);
    }
    await productDAO.setSeedProduct(products);
    res.send(products);
};

exports.selectUser = async (req, res) => {
    const users = await uesrDAO.selectUser();
    res.send(users);
}

exports.deleteUser = async (req, res) => {
    await uesrDAO.deleteUser();
    res.send('Delete All User Data!');
}

exports.selectHistory = async (req, res) => {
    const historys = await historyDAO.selectHistory();
    res.send(historys);
}

exports.deleteHistory = async (req, res) => {
     await historyDAO.deleteHistory();
    res.send('Delete All History Data!');
}