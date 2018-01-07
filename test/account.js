const request = require('supertest');
const dotenv = require('dotenv').config();
const app = require('./../app');
const chaiHttp = require('chai-http');
const chai = require('chai');
const should = chai.should();

chai.use(chaiHttp);

describe('Accounts', () => {
  const account = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john-doe@test.com',
    password: 'thisIsATest12!'
  }

  it('Should create a new account', async () => {
    const response = await chai.request(app).post('/v1/accounts').send(account);
    response.should.have.status(201);
  });
});
