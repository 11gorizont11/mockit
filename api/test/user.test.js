import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { server } from '../src/main';
import UserModel from '../src/models/User';

chai.use(chaiHttp);

const USER_URL = '/user';
const testUser = {
  login: 'testUser',
  email: 'test@gmail.com',
  password: 'testPass'
};

describe('User spec', () => {
  beforeEach(done => {
    UserModel.deleteOne({
      login: 'testUser',
      email: 'test@gmail.com'
    })
      .then(res => {
        console.log('Collection empty');
        done();
      })
      .catch(err => console.error(err));
  });

  it('Should create new User', done => {
    chai
      .request(server)
      .post(USER_URL)
      .send(testUser)
      .then(res => {
        expect(res).to.have.status(201);
        done();
      });
  });

  it('Should return error if user already exist', done => {
    chai
      .request(server)
      .post(USER_URL)
      .send(testUser)
      .then(() =>
        chai
          .request(server)
          .post(USER_URL)
          .send(testUser)
      )
      .then(res => {
        expect(res).to.have.status(400);
        done();
      });
  });
});
