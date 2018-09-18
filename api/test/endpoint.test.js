import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { server } from '../src/main';
import UserModel from '../src/models/User';
import TokenModel from '../src/models/RefreshToken';

chai.use(chaiHttp);

const SIGN_UP_URL = '/auth/sign-up';
const TESTED_URL = '/endpoint';

const testUser = {
  login: 'test endpoint',
  email: 'endpoint@mailinator.com',
  password: 'testPass1'
};
const mockedRes = {
  host: 'demo123',
  statusCode: 200,
  method: 'GET',
  path: '/olol',
  body: {
    key: '1',
    message: 'it new'
  }
};

describe('Endpoint Spec', () => {
  let token;
  let refreshToken;
  let testRes;

  before(done => {
    chai
      .request(server)
      .post(SIGN_UP_URL)
      .send(testUser)
      .then(res => {
        token = res.body.token;
        refreshToken = res.body.refreshToken;
        done();
      });
  });

  beforeEach(() => {
    testRes = Object.assign({}, mockedRes);
  });

  it('Should add new route', () => {
    chai
      .request(server)
      .post(TESTED_URL)
      .set('Authorization', `Bearer ${token}`)
      .send(testRes)
      .then(res => {
        expect(res).to.have.status(201);
        expect(res.body.message).equal('Endpoint created!');
      })
      .catch(err => console.error(err));
  });
  it('Should return error if required field is empty', () => {
    chai
      .request(server)
      .post(TESTED_URL)
      .set('Authorization', `Bearer ${token}`)
      .send({
        path: '/test',
        method: 'POST'
      })
      .then(res => {
        expect(res).to.have.status(400);
        expect(res.body.message).equal(
          'statusCode is required.\nbody should be Object type.'
        );
      })
      .catch(err => console.error(err));
  });

  it('Should return Error if method not allowed', () => {
    testRes.method = 'OLOLO';
    chai
      .request(server)
      .post(TESTED_URL)
      .set('Authorization', `Bearer ${token}`)
      .send(testRes)
      .then(res => {
        expect(res).to.have.status(400);
        expect(res.body.message).equal(`Method ${testRes.method} not allowed.`);
      })
      .catch(err => console.error(err));
  });
  it('Should return moked values', done => {
    chai
      .request(server)
      .post(TESTED_URL)
      .set('Authorization', `Bearer ${token}`)
      .send(testRes)
      .then(res =>
        chai
          .request(server)
          .get(mockedRes.path)
          .set('Authorization', `Bearer ${token}`)
      )
      .then(res => {
        expect(res).to.have.status(mockedRes.statusCode);
        expect(res.body).eqls(mockedRes.body);
        done();
      })
      .catch(err => console.error(err));
  });
  it('Should return Error if path and method existed', done => {
    chai
      .request(server)
      .post(TESTED_URL)
      .set('Authorization', `Bearer ${token}`)
      .send(testRes)
      .then(res =>
        chai
          .request(server)
          .post(TESTED_URL)
          .set('Authorization', `Bearer ${token}`)
          .send(mockedRes)
      )
      .then(res => {
        expect(res).to.have.status(405);
        expect(res.body.message).eqls(
          `Route with Path ${mockedRes.path} and Method ${
            mockedRes.method
          } has existed already.`
        );
        done();
      })
      .catch(err => console.error(err));
  });
  it('Service should be stopped', done => {
    chai
      .request(server)
      .post(TESTED_URL)
      .set('Authorization', `Bearer ${token}`)
      .send(testRes)
      .then(res =>
        chai
          .request(server)
          .delete(TESTED_URL)
          .set('Authorization', `Bearer ${token}`)
          .send({
            host: mockedRes.host,
            path: mockedRes.path,
            method: mockedRes.method
          })
      )
      .then(res => {
        expect(res).to.have.status(200);
        expect(res.body.message).equal('Service has been successfully stopped');
        done();
      })
      .catch(err => console.error(err));
  });

  it('Should return Error if route does not exist', () => {
    chai
      .request(server)
      .post(TESTED_URL)
      .set('Authorization', `Bearer ${token}`)
      .send(testRes)
      .then(() =>
        chai
          .request(server)
          .delete(TESTED_URL)
          .set('Authorization', `Bearer ${token}`)
          .send({
            path: '/some',
            method: 'DELETE'
          })
      )
      .then(res => {
        expect(res).to.have.status(404);
        expect(res.body.message).equal(
          `Route with Path /some and Method DELETE not found.`
        );
      })
      .catch(err => console.error(err));
  });

  after(async () => {
    await UserModel.deleteOne({ login: testUser.login });
    await TokenModel.deleteOne({ token: refreshToken });
  });
});
