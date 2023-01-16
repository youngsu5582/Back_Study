const Sequelize = require('sequelize');

const sequelize = new Sequelize('back_study', 'root', 'dlxogns831~', {
  dialect: 'mysql',
  host: 'localhost'
});

module.exports = sequelize;
