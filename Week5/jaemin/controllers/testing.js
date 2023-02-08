const faker = require('faker');
const Product = require('../Schema/Product');

exports.testingProducts =  async(req, res) => {
    const seed = req.body.seed;
    var productList = new Array();

    await faker.seed(seed);

    for(var i=0; i<100; i++) {
        var data = new Object;
        var price = faker.commerce.price(5000, 30000, 0);
        var name = faker.commerce.productName();
        var seller = faker.name.findName();
        data.price = price;
        data.name = name;
        data.seller = seller;
        productList.push(data);
        
        const product = new Product({
            price: price,
            name: name,
            seller: seller
        })
        product.save();
    }
    res.json(productList);
}