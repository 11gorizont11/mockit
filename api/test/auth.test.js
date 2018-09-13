import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { server } from '../src/main';

chai.use(chaiHttp);

const LOGIN_URL = 'auth/login';
const LOGOUT_URL = 'auth/logout';
const testUser = {
  login: 'testUser',
  password: 'pass1'
};

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
        console.log('Res Body', res.body);
        expect(res).to.have.status(200);
      })
      .catch(console.error);
  });
  //   it('Should logout user idf user log in', () => {
  //     chai
  //       .request(server)
  //       .post(LOGOUT_URL)
  //       .send({
  //         userName: 'Test'
  //       })
  //       .then(res => {
  //         expect(res).to.have.status(200);
  //       });
  //   });
});
