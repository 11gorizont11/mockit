import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { server } from '../src/main';
import UserModel from '../src/models/User';
import TokenModel from '../src/models/RefreshToken';

chai.use(chaiHttp);

const SIGN_UP_URL = '/auth/sign-up';
const LOGOUT_URL = '/auth/logout';

const testUser = {
  login: 'test logout',
  email: 'logout@mailinator.com',
  password: 'testPass1'
};

describe('Logout spec', () => {
  after(async () => {
    await UserModel.deleteOne({ login: testUser.login });
  });

  it('Should logout user', done => {
    chai
      .request(server)
      .post(SIGN_UP_URL)
      .send(testUser)
      .then(res =>
        chai
          .request(server)
          .post(LOGOUT_URL)
          .set('Authorization', `Bearer ${res.body.token}`)
          .then(res => {
            console.log('res', res.body);
            expect(res).to.have.status(200);
            done();
          })
          .catch(console.error)
      );
  });
});
