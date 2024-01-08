const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Create a new user
router.post('/', userController.createUser);

// Update an existing user by ID
router.put('/:userId', userController.updateUser);

// Delete a user by ID
router.delete('/:userId', userController.deleteUser);

// Get a list of all users
router.get('/', userController.getAllUsers);

// Search for users by first name
router.get('/search', userController.searchUsersByFirstName);

module.exports = router;
