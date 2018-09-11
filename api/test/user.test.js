import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { server } from '../src/main';

chai.use(chaiHttp);

const USER_URL = '/user';

describe('User spec', () => {
  it('Should create new User', () => {
    chai
      .request(server)
      .post({
        login: 'testUser',
        email: 'test@gmail.com',
        password: 'testPass'
      })
      .then(res => {
        expect(res).to.have.status(201);
      });
  });
});
