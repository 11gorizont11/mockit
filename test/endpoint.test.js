import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { server } from '../src/main';

chai.use(chaiHttp);

const testUrl = '/endpoint';
const mockedRes = {
  statusCode: 200,
  method: 'GET',
  path: '/olol',
  body: {
    key: '1',
    message: 'it new'
  }
};

describe('Endpoint Spec', () => {
  it('Should return moked values', () => {
    chai
      .request(server)
      .post(testUrl)
      .send(mockedRes)
      .then(res => chai.request(server).get(mockedRes.path))
      .then(res => {
        expect(res).to.have.status(mockedRes.statusCode);
        expect(res.body).eqls(mockedRes.body);
      });
  });
  it('Should return Error if path and method existed', () => {
    chai
      .request(server)
      .post(testUrl)
      .send(mockedRes)
      .then(res =>
        chai
          .request(server)
          .post(testUrl)
          .send(mockedRes)
      )
      .then(res => {
        expect(res).to.have.status(405);
        expect(res.text).eqls(
          `Route with Path ${mockedRes.path} and Method ${
            mockedRes.method
          } has existed already.`
        );
      });
  });
  it('Service should be stopped', () => {
    chai
      .request(server)
      .post(testUrl)
      .send(mockedRes)
      .then(res =>
        chai
          .request(server)
          .delete(testUrl)
          .send({
            path: mockedRes.path,
            method: mockedRes.method
          })
      )
      .then(res => {
        expect(res).to.have.status(200);
        expect(res.text).equal('Service has been successfully stopped');
      })
      .catch(err => {
        console.log(err);
      });
  });

  it('Should return Error if route does not exist', () => {
    chai
      .request(server)
      .post(testUrl)
      .send(mockedRes)
      .then(() =>
        chai
          .request(server)
          .delete(testUrl)
          .send({
            path: '/some',
            method: 'DELETE'
          })
      )
      .then(res => {
        expect(res).to.have.status(404);
        expect(res.text).equal(
          `Route with Path /some and Method DELETE not found.`
        );
      });
  });
});
