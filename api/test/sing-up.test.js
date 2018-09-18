import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { server } from '../src/main';
import UserModel from '../src/models/User';
import TokenModel from '../src/models/RefreshToken';

chai.use(chaiHttp);

const SIGN_UP_URL = '/auth/sign-up';

const testUser = {
  login: 'Test User',
  email: 'testemail@mailinator.com',
  password: 'testPass!'
};

describe('Sign up spec', () => {
  let refreshToken;
  after(async () => {
    await UserModel.deleteOne({ login: testUser.login });
    await TokenModel.deleteOne({ token: refreshToken });
  });

  it('Should create user', done => {
    chai
      .request(server)
      .post(SIGN_UP_URL)
      .send(testUser)
      .then(res => {
        refreshToken = res.body.refreshToken;
        expect(res).to.have.status(200);
        expect(res.body.token).to.be.a('string').that.not.empty;
        expect(res.body.refreshToken).to.be.a('string').that.not.empty;
        done();
      })
      .catch(console.error);
  });

  it('Should return error if some fields are empty', () => {
    chai
      .request(server)
      .post(SIGN_UP_URL)
      .send({ login: 'test' })
      .then(res => {
        expect(res).to.have.status(400);
        expect(res.body.message).eql('Invalid credentials.');
      })
      .catch(console.error);
  });

  it('should return error if user already exist', done => {
    chai
      .request(server)
      .post(SIGN_UP_URL)
      .send(testUser)
      .then(res => {
        expect(res).to.have.status(400);
        expect(res.body.message).eql('This user is already exist.');
        done();
      })
      .catch(console.error);
  });
});
