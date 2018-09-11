import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { server } from '../src/main';

chai.use(chaiHttp);

const TESTED_URL = '/endpoint';
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
  let testRes;

  beforeEach(() => {
    testRes = Object.assign({}, mockedRes);
  });
  it('Should add new route', () => {
    chai
      .request(server)
      .post(TESTED_URL)
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
      .send({
        path: '/test',
        method: 'POST'
      })
      .then(res => {
        expect(res).to.have.status(400);
        expect(res.body.message).equal(
          'statusCode is required.\nbody should be Object type.'
        );
      });
  });

  it('Should return Error if method not allowed', () => {
    testRes.method = 'OLOLO';
    chai
      .request(server)
      .post(TESTED_URL)
      .send(testRes)
      .then(res => {
        expect(res).to.have.status(400);
        expect(res.body.message).equal(`Method ${testRes.method} not allowed.`);
      });
  });
  it('Should return moked values', () => {
    chai
      .request(server)
      .post(TESTED_URL)
      .send(testRes)
      .then(res => chai.request(server).get(mockedRes.path))
      .then(res => {
        expect(res).to.have.status(mockedRes.statusCode);
        expect(res.body).eqls(mockedRes.body);
      });
  });
  it('Should return Error if path and method existed', () => {
    chai
      .request(server)
      .post(TESTED_URL)
      .send(testRes)
      .then(res =>
        chai
          .request(server)
          .post(TESTED_URL)
          .send(mockedRes)
      )
      .then(res => {
        expect(res).to.have.status(405);
        expect(res.body.message).eqls(
          `Route with Path ${mockedRes.path} and Method ${
            mockedRes.method
          } has existed already.`
        );
      });
  });
  it('Service should be stopped', () => {
    chai
      .request(server)
      .post(TESTED_URL)
      .send(testRes)
      .then(res =>
        chai
          .request(server)
          .delete(TESTED_URL)
          .send({
            host: mockedRes.host,
            path: mockedRes.path,
            method: mockedRes.method
          })
      )
      .then(res => {
        expect(res).to.have.status(200);
        expect(res.body.message).equal('Service has been successfully stopped');
      })
      .catch(err => {
        console.log(err);
      });
  });

  it('Should return Error if route does not exist', () => {
    chai
      .request(server)
      .post(TESTED_URL)
      .send(testRes)
      .then(() =>
        chai
          .request(server)
          .delete(TESTED_URL)
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
      });
  });
});
