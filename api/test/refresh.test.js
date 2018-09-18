import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { server } from '../src/main';
import UserModel from '../src/models/User';
import TokenModel from '../src/models/RefreshToken';

chai.use(chaiHttp);

const SIGN_UP_URL = '/auth/sign-up';
const REFRESH_URL = '/auth/refresh';

const testUser = {
  login: 'test refresh',
  email: 'refresh@mailinator.com',
  password: 'testPass1'
};

describe('Refresh token spec', () => {
  let refreshToken;
  after(async () => {
    await UserModel.deleteOne({ login: testUser.login });
    await TokenModel.deleteOne({ token: refreshToken });
  });

  it('Should refresh token pair', done => {
    chai
      .request(server)
      .post(SIGN_UP_URL)
      .send(testUser)
      .then(res =>
        chai
          .request(server)
          .post(REFRESH_URL)
          .send({
            refreshToken: res.body.refreshToken
          })
      )
      .then(res => {
        refreshToken = res.body.refreshToken;
        expect(res).to.have.status(200);
        expect(res.body.token).to.be.a('string').that.not.empty;
        expect(res.body.refreshToken).to.be.a('string').that.not.empty;
        done();
      });
  });

  it('Should return error if token invalid', () => {
    chai
      .request(server)
      .post(REFRESH_URL)
      .send({
        refreshToken: 'INVALID_TOKEN'
      })
      .then(res => {
        expect(res).to.have.status(404);
        expect(res.body.message).to.be.a('string').that.not.empty;
      });
  });
});
