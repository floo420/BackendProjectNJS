const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index'); // Assuming your Express app is in this file

const { expect } = chai;
chai.use(chaiHttp);

describe('Events API', () => {
  it('should return a list of events', (done) => {
    chai.request(app)
      .get('/events') // Replace with your actual endpoint URL
      .end((err, res) => {
        expect(res).to.have.status(200); // Assuming a successful response has a 200 status code
        expect(res.body).to.be.an('array'); // Assuming the response body is an array of events
        done();
      });
  });
});
