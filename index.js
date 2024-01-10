const express = require('express');
const bodyParser = require('body-parser');
const eventRoutes = require('./api/routes/eventRoutes'); 

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// MySQL database configuration
const mysql = require('mysql');
const dbConfig = require('./dbConfig'); // Make sure dbConfig.js contains your MySQL connection configuration

const connection = mysql.createConnection(dbConfig);

// Connect to MySQL
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// Use your event routes
app.use('/events', eventRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
