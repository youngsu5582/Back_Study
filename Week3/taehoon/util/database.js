const Sequelize = require('sequelize');

const sequelize = new Sequelize('back_study4', 'root', 'dlxogns831~', {
  dialect: 'mysql',
  host: 'localhost'
});

module.exports = sequelize;
