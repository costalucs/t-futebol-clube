import * as sinon from 'sinon';
import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import { notFound, oneTeam, teams } from './mocks/teamsMocks';
import TeamServices from '../services/TeamServices';
import Team from '../database/models/Team';

chai.use(chaiHttp);

describe('Testando as funcionalidades na rota /teams', () => {
  beforeEach(sinon.restore);
  const teamService = new TeamServices()
  it('Testando o retorno dos times na rota', async () => {
    sinon.stub(teamService, 'getAll').resolves(teams);

    const response = await chai
      .request(app).get('/teams')
    chai.expect(response.status).to.be.equal(200);
    chai.expect(response.body).to.deep.equal(teams);
  })
  it('Testando o retorno dos times na rota teams/1', async () => {
    sinon.stub(Team, 'findOne').resolves(oneTeam as Team);

    const response = await chai
      .request(app).get('/teams/1')
    chai.expect(response.status).to.be.equal(200);
    chai.expect(response.body).to.deep.equal(oneTeam);
  })
  it('Testando o retorno dos times na rota teams/inexistente', async () => {
    sinon.stub(Team, 'findOne').resolves(null);

    const response = await chai
      .request(app).get('/teams/666')
    chai.expect(response.status).to.be.equal(400);
    chai.expect(response.body).to.deep.equal(notFound);
  })

})