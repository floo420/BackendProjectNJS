const { Sequelize } = require('sequelize');
const EventModel = require('./api/models/eventModel');

const sequelize = new Sequelize('BackendProjectNodeJS', 'root', 'root', {
  host: '127.0.0.1',
  port: '8889',
  dialect: 'mysql',
  logging: false,
});

const Event = EventModel(sequelize, Sequelize.DataTypes);

module.exports = {
  sequelize,
  Event
};
