const express = require('express');
const bodyParser = require('body-parser');
const eventRoutes = require('./api/routes/eventRoutes');
const userRoutes = require('./api/routes/userRoutes');
const mysql = require('mysql2/promise'); 
const dbConfig = require('./dbConfig'); 

const pool = mysql.createPool(dbConfig);

const app = express();
const port = process.env.PORT || 3000;

// Parse JSON data in request bodies
app.use(bodyParser.json());
app.use(express.static('public'));

app.use('/events', eventRoutes);
app.use('/users', userRoutes);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});


// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
