import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { server } from '../src/main';

chai.use(chaiHttp);

describe('Auth spec', () => {
  const SIGN_UP_URL = 'auth/sign-up';
  const LOGIN_URL = 'auth/login';
  const LOGOUT_URL = 'auth/logout';

  const testUser = {
    login: 'Test User',
    email: 'testemail@mailinator.com',
    password: 'testPass!'
  };
  //FIXME: fix this test
  it('Should create user', () => {
    chai
      .request(server)
      .post(SIGN_UP_URL)
      .send(testUser)
      .then(res => {
        console.log('res', res);
        expect(res).to.have.status(200);
        expect(res.body.token).is.not.empty();
      })
      .catch(console.error);
  });
  it('Should login user', () => {
    chai
      .request(server)
      .post(LOGIN_URL)
      .send({
        login: 'Test User',
        password: 'testPass!'
      })
      .then(res => {
        console.log('Res Body', res.body);
        expect(res).to.have.status(200);
      })
      .catch(console.error);
  });
});
