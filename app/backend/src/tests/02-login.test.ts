import * as sinon from 'sinon';
import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/User';
import { allFieldsMustBe, incorrectEmailOrPassword, tokenResponse, user } from './mocks/loginMocks';

chai.use(chaiHttp);


describe('Testando a rota /login', () => {
  describe('Testando o post de um login válido', () => {
    beforeEach(sinon.restore);
    it('O teste deve retornar um status 200 e uma chave token', async () => {
      sinon.stub(User, 'findOne').resolves(user as User);
      sinon.stub(jwt, 'sign').resolves(tokenResponse.token);
      sinon.stub(bcrypt, 'compare').resolves(true);

      const response = await chai
        .request(app).post('/login')
        .send({ email: 'admin@admin.com', password: 'secret_admin' });

      chai.expect(response.status).to.be.equal(200);
      chai.expect(response.body).to.haveOwnProperty('token');
    });

    it('O teste deve retornar um status 401 e uma mensagem de erro', async () => {
      sinon.stub(User, 'findOne').resolves(user as User);
      sinon.stub(jwt, 'sign').resolves(tokenResponse.token);
      sinon.stub(bcrypt, 'compare').resolves(false);

      const response = await chai
        .request(app).post('/login')
        .send({ email: 'admin@admin.com', password: 'secret_admin' });

      chai.expect(response.status).to.be.equal(401);
      chai.expect(response.body).to.deep.equal(incorrectEmailOrPassword);
    });

    it('O teste deve retornar um status 401 e uma mensagem de erro', async () => {
      sinon.stub(User, 'findOne').resolves(null);

      const response = await chai
        .request(app).post('/login')
        .send({ email: 'lucas@admin.com', password: 'secret_admin' });

      chai.expect(response.status).to.be.equal(401);
      chai.expect(response.body).to.deep.equal(incorrectEmailOrPassword);
    });

    it('O teste deve retornar um status 401 e uma mensagem de erro', async () => {
      const response = await chai
        .request(app).post('/login')
        .send({ password: 'secret_admin' });

      chai.expect(response.status).to.be.equal(400);
      chai.expect(response.body).to.deep.equal(allFieldsMustBe);
    });

    it('testando a rota /login/validate com erro', async () => {
      const response = await chai
        .request(app).get('/login/validate')

      chai.expect(response.status).to.be.equal(401);
      chai.expect(response.body).to.deep.equal({ message: 'unauthorized' });
    });
    it('testando a rota /login/validate', async () => {
      sinon.stub(jwt, 'verify').resolves('admin');

      const response = await chai
        .request(app).get('/login/validate')
        .set({ "Authorization": tokenResponse.token })

      chai.expect(response.status).to.be.equal(200);
    });
  })
});
