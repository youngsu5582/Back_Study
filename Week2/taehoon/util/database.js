const Sequelize = require('sequelize');
require('dotenv').config();
const sequelize = new Sequelize('back_study', 'root', process.env.DB_PSWORD, {
  dialect: 'mysql',
  host: 'localhost'
});

module.exports = sequelize;
