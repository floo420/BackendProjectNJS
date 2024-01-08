// routes/eventRoutes.js
const express = require('express');
const eventController = require('../controllers/eventController');

const router = express.Router();

// Search for events by event name (place this route before the generic route)
router.get('/search', eventController.searchEventsByName);

// Define routes for event-related operations
router.post('/', eventController.createEvent);
router.get('/', eventController.getEvents);
router.get('/:eventId', eventController.getEventById);
router.put('/:eventId', eventController.updateEvent);
router.delete('/:eventId', eventController.deleteEvent);

module.exports = router;
