import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { server } from '../src/main';
import UserModel from '../src/models/User';
import TokenModel from '../src/models/RefreshToken';

chai.use(chaiHttp);

const LOGIN_URL = '/auth/login';

const testUser = {
  login: 'test sign up',
  email: 'singup@mailinator.com',
  password: 'testPass1'
};

describe('Login spec', () => {
  let refreshToken;
  before(async () => {
    await UserModel.create(testUser);
  });

  after(async () => {
    await UserModel.deleteOne({ login: testUser.login });
    await TokenModel.deleteOne({ token: refreshToken });
  });

  it('Should login user', () => {
    chai
      .request(server)
      .post(LOGIN_URL)
      .send({
        login: testUser.login,
        password: testUser.password
      })
      .then(res => {
        refreshToken = res.body.refreshToken;
        expect(res).to.have.status(200);
        expect(res.body.token).to.be.a('string').that.not.empty;
        expect(res.body.refreshToken).to.be.a('string').that.not.empty;
      })
      .catch(console.error);
  });

  it('Should return error if invalid creads', () => {
    chai
      .request(server)
      .post(LOGIN_URL)
      .send({
        login: 'Wrong login',
        password: 'Wrong pass!'
      })
      .then(res => {
        expect(res).to.have.status(403);
        expect(res.body.message).eql(
          'Invalid credentials username or password'
        );
      })
      .catch(console.error);
  });
});
