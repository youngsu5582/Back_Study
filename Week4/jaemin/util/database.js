const Sequelize = require('sequelize');

const sequelize = new Sequelize('backstudy', 'root', 'jaemin5548', {
    dialect: 'mysql', 
    host: 'localhost'
});


module.exports = sequelize;

