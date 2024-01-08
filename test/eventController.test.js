const request = require('supertest');
const app = require('../index'); // Replace with the correct path to your Express app
const chai = require('chai');
const expect = chai.expect;
const pool = require('../dbConfig'); // Replace with the correct path to your MySQL connection pool

describe('Event Controller', () => {
  // Run before all tests to set up the test environment
  before(async () => {
    // Create a test database or ensure you're using a separate test database
    // This can include creating tables, seeding data, etc.
    // You can use the pool to execute SQL queries to set up your database
    await pool.query('CREATE DATABASE IF NOT EXISTS test_db');
    await pool.query('USE test_db');
    // Create your tables and seed data as needed
  });

  it('should store data in the database', async () => {
    const response = await request(app)
      .post('/events')
      .send({
        event_name: 'Test Event',
        event_date: '2024-01-15',
      });
  
    expect(response.status).to.equal(201);
  
    // Add assertions to check if the data is correctly stored in the database
    const [rows] = await pool.query('SELECT * FROM events WHERE event_name = ?', ['Test Event']);
    expect(rows).to.have.lengthOf(1); // Check if one row with the event name exists in the database
  });
  

  // Run after all tests to clean up the test environment
  after(async () => {
    // Clean up the test database and close connections
    await pool.query('DROP DATABASE IF EXISTS test_db');
    // Close your database connections
    await pool.end();
  });

  // Your test cases go here

});
