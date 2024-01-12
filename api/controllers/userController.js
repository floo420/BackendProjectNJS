// controllers/userController.js
const User = require('../models/userModel');
const pool = require('../../dbConfig');

// Create a new user
exports.createUser = async (req, res) => {
  try {
    const newUserId = await User.createUser(pool, req.body);
    const newUser = await User.getUserById(pool, newUserId);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update an existing user
exports.updateUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.getUserById(pool, userId); 
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    await User.updateUser(pool, userId, req.body); 
    const updatedUser = await User.getUserById(pool, userId); 
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a user
exports.deleteUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.getUserById(pool, userId); 
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    await User.deleteUser(pool, userId); 
    res.status(204).send();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get a list of all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.getAllUsers(pool);
    res.status(200).json(users);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Search for users by first name
exports.searchUsersByFirstName = async (req, res) => {
  const { firstName } = req.query;
  try {
    const users = await User.getAllUsers(pool); // Use getAllUsers to fetch all users
    const filteredUsers = users.filter(user => user.first_name === firstName);
    res.status(200).json(filteredUsers);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get user by ID
exports.getUserById = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.getUserById(pool, userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Implement other controller functions as needed
