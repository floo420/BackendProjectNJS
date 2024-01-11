const express = require('express');
const bodyParser = require('body-parser');
const eventRoutes = require('./api/routes/eventRoutes');
const userRoutes = require('./api/routes/userRoutes');
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

app.use('/events', eventRoutes);
app.use('/users', userRoutes);

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

app.post('/createUser', async (req, res) => {
  try {
      // Perform API action to create a new user with pre-configured data
      const newUserId = await User.createUser(pool, {
          first_name: "florian",
          last_name: "brasseur",
          email: "florian@gmail.com",
          phone_number: "123-456-7890",
          birthdate: "2003-07-28"
      });
      const newUser = await User.getUserById(pool, newUserId);
      res.status(201).json(newUser);
  } catch (err) {
      res.status(400).json({ error: err.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
