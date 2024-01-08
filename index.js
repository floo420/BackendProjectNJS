const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const eventRoutes = require('./api/routes/eventRoutes'); // Import your event routes

const db = require('./dbConfig');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Connect to MongoDB (if using MongoDB)
mongoose.connect('mongodb://localhost/your-database-name', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Use your event routes
app.use('/events', eventRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
