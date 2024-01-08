// userController.js

const User = require('../models/userModel');

// Create a new user
exports.createUser = (req, res) => {
  const newUser = new User(req.body);

  // Basic validation example
  if (!newUser.first_name || !newUser.last_name || !newUser.email) {
    return res.status(400).json({ error: 'First name, last name, and email are required fields' });
  }

  newUser.save((err, user) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(201).json(user);
    }
  });
};

// Update an existing user by ID
exports.updateUser = (req, res) => {
  User.findByIdAndUpdate(req.params.userId, req.body, { new: true }, (err, user) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).json(user);
    }
  });
};

// Delete a user by ID
exports.deleteUser = (req, res) => {
  User.findByIdAndRemove(req.params.userId, (err, user) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(204).send();
    }
  });
};

// Get a list of all users
exports.getAllUsers = (req, res) => {
  User.find({}, (err, users) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).json(users);
    }
  });
};

// Search for users by first name
exports.searchUsersByFirstName = (req, res) => {
  const { firstName } = req.query;

  User.find({ first_name: firstName }, (err, users) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).json(users);
    }
  });
};

// Implement other controller functions as needed
