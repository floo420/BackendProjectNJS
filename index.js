const express = require('express');
const bodyParser = require('body-parser');
const eventRoutes = require('./api/routes/eventRoutes');
const mysql = require('mysql2/promise'); 
const dbConfig = require('./dbConfig'); 

const pool = mysql.createPool(dbConfig);

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});
app.use(express.static('public'));

// Parse JSON data in request bodies
app.use(bodyParser.json());

// Import and use your event routes
app.use('/events', eventRoutes);

// Handle button click to create an event
app.post('/createEvent', async (req, res) => {
    try {
        // Perform API action to create a new event with pre-configured data
        const newEventId = await Event.createEvent(pool, {
            event_name: "Sample Event",
            event_date: "2024-01-20",
            event_location: "Sample Location",
            event_description: "This is a sample event description."
        });
        const newEvent = await Event.getEventById(pool, newEventId);
        res.status(201).json(newEvent);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
