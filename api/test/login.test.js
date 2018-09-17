import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { server } from '../src/main';
import UserModel from '../src/models/User';

chai.use(chaiHttp);

const LOGIN_URL = '/auth/login';

const testUser = {
  login: 'test sign up',
  email: 'singup@mailinator.com',
  password: 'testPass1'
};

describe('Login spec', () => {
  before(async () => {
    await UserModel.create(testUser);
    done();
  });

  after(async () => {
    await UserModel.deleteOne({ login: testUser.login });
  });

  it('Should login user', done => {
    chai
      .request(server)
      .post(LOGIN_URL)
      .send({
        login: 'Test User',
        password: 'testPass!'
      })
      .then(res => {
        expect(res).to.have.status(200);
        expect(res.body.token).to.be.a('string').that.not.empty;
        expect(res.body.refreshToken).to.be.a('string').that.not.empty;
        done();
      })
      .catch(console.error);
  });
});
