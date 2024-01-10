const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('BackendProjectNodeJS', 'root', 'root', {
  host: '127.0.0.1',
  port: '8889',
  dialect: 'mysql',
  logging: false, // You can enable logging for debugging if needed
});

module.exports = {
  sequelize, // Export the Sequelize instance
  Event: sequelize.import('./eventModel'), // Import the Event model and export it
};
