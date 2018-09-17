import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { server } from '../src/main';
import UserModel from '../src/models/User';

chai.use(chaiHttp);

const SIGN_UP_URL = '/auth/sign-up';

const testUser = {
  login: 'Test User',
  email: 'testemail@mailinator.com',
  password: 'testPass!'
};

describe('Sign up spec', () => {
  // after(done => {
  //   UserModel.deleteOne({ login: testUser.login }).then(res => {
  //     done();
  //   });
  // });

  it('Should create user', done => {
    chai
      .request(server)
      .post(SIGN_UP_URL)
      .send(testUser)
      .then(res => {
        expect(res).to.have.status(200);
        expect(res.body.token).to.be.a('string').that.not.empty;
        expect(res.body.refreshToken).to.be.a('string').that.not.empty;
        done();
      })
      .catch(console.error);
  });

  it('Should return error if some filds are empty', done => {
    chai
      .request(server)
      .post({ login: 'test' })
      .send(testUser)
      .then(res => {
        expect(res).to.have.status(200);
        done();
      })
      .catch(console.error);
  });

  // it('should return error if user already exist', done => {
  //   chai
  //     .request(server)
  //     .post(SIGN_UP_URL)
  //     .send(testUser)
  //     .then(res => {
  //       console.log(res.body);
  //       expect(res).to.have.status(500);
  //       done();
  //     })
  //     .catch(console.error);
  // });
});
