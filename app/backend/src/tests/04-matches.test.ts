import * as sinon from 'sinon';
import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import MatchServices from '../services/MatchServices';
import { matches } from './mocks/matchesMock';

chai.use(chaiHttp);
const matchServices = new MatchServices();


describe('Testando a rota /matches', () => {
  it('Testando o retorno correto da rota', async () => {
    sinon.stub(matchServices, 'getAll').resolves(matches)

    const response = await chai
      .request(app).get('/matches')

    chai.expect(response.status).to.be.equal(200)
    chai.expect(response.body).to.deep.equal(matches)
  })
})