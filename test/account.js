const request = require('supertest');
const dotenv = require('dotenv').config();
const app = require('./../app');
const chaiHttp = require('chai-http');
const chai = require('chai');
chai.should();

chai.use(chaiHttp);

describe('Accounts & Auth', () => {
  const account = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john-doe@test.com',
    password: 'thisIsATest12!'
  }

  it('Should create a new account', async () => {
    const response = await chai.request(app).post('/v1/accounts').send(account);
    response.should.have.status(201);
    response.body.firstName.should.equal(account.firstName);
    response.body.lastName.should.equal(account.lastName);
    response.body.email.should.equal(account.email);
    response.body.should.have.property('id');
    account.id = response.body.id;
  });

  it('Should recieve jwt auth token', async () => {
    const response = await chai.request(app).post('/v1/auth').send(account);
    response.should.have.status(200);
    response.body.should.have.property('token');
    account.token = response.body.token;
  });
});
