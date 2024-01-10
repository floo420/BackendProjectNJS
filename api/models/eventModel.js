// models/eventModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../../dbConfig'); 

const Event = sequelize.define('Event', {
  event_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  event_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  event_location: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  event_description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = Event;
