// models/userModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../dbConfig'); 

// models/userModel.js

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true, // Validate email format
      },
    },
    age: {
      type: DataTypes.INTEGER,
      validate: {
        min: 18, // Validate age as a minimum of 18
      },
    },
    // Define other fields as needed
  });

  return User;
};
