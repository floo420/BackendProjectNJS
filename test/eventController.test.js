// test/eventController.test.js
const request = require('supertest');
const app = require('../index'); // Replace with the correct path to your Express app
const chai = require('chai');
const expect = chai.expect;
const { sequelize, Event } = require('./dbConfig'); // Import your database configuration and Event model

describe('Event Controller', () => {
  before(async () => {
    // Sync the database to create the Event table
    await sequelize.sync();
  });

  it('should store data in the database', async () => {
    const eventData = {
      event_name: 'Test Event',
      event_date: '2024-01-15',
    };

    const response = await request(app)
      .post('/events')
      .send(eventData);

    expect(response.status).to.equal(201);
    expect(response.body.event_name).to.equal(eventData.event_name);
    expect(response.body.event_date).to.equal(eventData.event_date);

    // Retrieve the event from the database and check if it matches the sent data
    const storedEvent = await Event.findByPk(response.body.id);
    expect(storedEvent).to.not.be.null;
    expect(storedEvent.event_name).to.equal(eventData.event_name);
    expect(storedEvent.event_date.toISOString()).to.equal(eventData.event_date);
  });

  after(async () => {
    // Close the database connection after tests
    await sequelize.close();
  });

  // Add more test cases as needed

});
