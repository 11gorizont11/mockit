import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { server } from '../src/main';

chai.use(chaiHttp);

const LOGIN_URL = '/login';
const LOGOUT_URL = '/logout';

describe('Auth spec', () => {
  it('Should login user', () => {
    chai
      .request(server)
      .post(LOGIN_URL)
      .send({
        userName: 'Test',
        password: 'testPass'
      })
      .then(res => {
        expect(res).to.have.status(200);
      });
  });
  it('Should logout user idf user log in', () => {
    chai
      .request(server)
      .post(LOGOUT_URL)
      .send({
        userName: 'Test'
      })
      .then(res => {
        expect(res).to.have.status(200);
      });
  });
});
