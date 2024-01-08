// dbConfig.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('BackendProjectNodeJS', 'root', 'root', {
  host: '127.0.0.1',
  dialect: 'mysql',
  logging: false, // You can enable logging for debugging if needed
});

module.exports = sequelize;
