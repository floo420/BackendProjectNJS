// routes/userRoutes.js
const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

// Define routes for user-related operations
router.post('/', userController.createUser);
router.get('/', userController.getAllUsers);
router.get('/search', userController.searchUsersByFirstName);
router.get('/:userId', userController.getUserById);
router.put('/:userId', userController.updateUser);
router.delete('/:userId', userController.deleteUser);

module.exports = router;
