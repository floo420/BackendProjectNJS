const express = require('express');
const bodyParser = require('body-parser');
const eventRoutes = require('./api/routes/eventRoutes'); 

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});
app.use(express.static('public'));
// Middleware
app.use(bodyParser.json());

// MySQL database configuration
const mysql = require('mysql/promise');
const dbConfig = require('./dbConfig'); // Make sure dbConfig.js contains your MySQL connection configuration

const pool = mysql.createPool(dbConfig);

// Use your event routes
app.use('/events', eventRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
