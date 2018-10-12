import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { server } from '../src/main';
import UserModel from '../src/models/User';
import TokenModel from '../src/models/RefreshToken';

chai.use(chaiHttp);

const SIGN_UP_URL = '/auth/sign-up';
const TESTED_URL = '/user/routes';

const testUser = {
  login: 'test user',
  email: 'testuser@mailinator.com',
  password: 'testPass3'
};

describe('User spec', () => {
  let refreshToken;
  it('Should return user stubs', (done) => {
    chai
      .request(server)
      .post(SIGN_UP_URL)
      .send(testUser)
      .then(res => {
        refreshToken = res.body.refreshToken;
        return chai
        .request(server)
        .get(TESTED_URL)
        .set('Authorization', `Bearer ${res.body.token}`)}).then(res => {
          expect(res).to.have.status(200)
          expect(res.body.stubs).to.be.a('array');
          done();
        })
  });
   after(async () => {
    await UserModel.deleteOne({ login: testUser.login });
    await TokenModel.deleteOne({ token: refreshToken });
  });
});
