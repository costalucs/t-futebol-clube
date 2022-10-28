import * as sinon from 'sinon';
import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import MatchServices from '../services/MatchServices';
import { createdMatch, matches, matchesFinish, matchesInProgress } from './mocks/matchesMock';
import Match from '../database/models/Match';
import { tokenResponse } from './mocks/loginMocks';

chai.use(chaiHttp);
const matchServices = new MatchServices();


describe('Testando a rota /matches', () => {
  beforeEach(sinon.restore);

  it('Testando o retorno correto da rota get /matches', async () => {
    sinon.stub(matchServices, 'getAll').resolves(matches)

    const response = await chai
      .request(app).get('/matches')

    chai.expect(response.status).to.be.equal(200)
    chai.expect(response.body).to.deep.equal(matches)
  })
  it('Testando o retorno correto da rota  get /matches?inProgress=true', async () => {
    sinon.stub(matchServices, 'getMatches').resolves(matchesInProgress)

    const response = await chai
      .request(app).get('/matches?inProgress=true')

    chai.expect(response.status).to.be.equal(200)
    chai.expect(response.body).to.deep.equal(matchesInProgress)
  })

  it('Testando o retorno correto da rota get /matches?inProgress=false', async () => {
    sinon.stub(matchServices, 'getMatches').resolves(matchesFinish)

    const response = await chai
      .request(app).get('/matches?inProgress=false')

    chai.expect(response.status).to.be.equal(200)
    chai.expect(response.body).to.deep.equal(matchesFinish)
  })
  it('Testando finalizar uma partida', async () => {
    sinon.stub(matchServices, 'finishMatch').resolves(null)

    const response = await chai
      .request(app).patch('/matches/1/finish')

    chai.expect(response.status).to.be.equal(200)
    chai.expect(response.body).to.deep.equal({ "message": "Finished" })
  })
  it('Testando criar uma partida com os mesmos times', async () => {
    sinon.stub(matchServices, 'createMatch').resolves(null)

    const response = await chai
      .request(app).post('/matches')
      .send({
        homeTeam: 1, 
        awayTeam: 1, 
        homeTeamGoals: 2,
        awayTeamGoals: 2
      })
      .set({'Authorization': tokenResponse.token})

    chai.expect(response.status).to.be.equal(422)
    chai.expect(response.body).to.deep.equal({ message: 'It is not possible to create a match with two equal teams' })
  })
  it('Testando criar uma partida com id inexistente', async () => {
    sinon.stub(matchServices, 'createMatch').resolves(null)

    const response = await chai
      .request(app).post('/matches')
      .send({
        homeTeam: 1, 
        awayTeam: 111312, 
        homeTeamGoals: 2,
        awayTeamGoals: 2
      })
      .set({'Authorization': tokenResponse.token})

    chai.expect(response.status).to.be.equal(404)
    chai.expect(response.body).to.deep.equal({ message: 'There is no team with such id!' })
  })
  it('Testando criar uma partida', async () => {
    sinon.stub(matchServices, 'createMatch').resolves(createdMatch as Match)

    const response = await chai
      .request(app).post('/matches')
      .send({
        homeTeam: 1, 
        awayTeam: 16, 
        homeTeamGoals: 2,
        awayTeamGoals: 2
      })
      .set({'Authorization': tokenResponse.token})

    chai.expect(response.status).to.be.equal(201)
    chai.expect(response.body).to.deep.equal({
      "inProgress": true,
      "id": 50,
      "homeTeam": 1,
      "awayTeam": 16,
      "homeTeamGoals": 2,
      "awayTeamGoals": 2
    })
  })
})