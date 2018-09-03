import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { server } from '../src/main';

chai.use(chaiHttp);

const ENDPOINT_URL = '/endpoint';

const mockedRes = {
  statusCode: 200,
  method: 'GET',
  path: '/some-url',
  body: {
    key: '10',
    message: 'it new'
  }
};
describe('Server', () => {
  let testRes;

  beforeEach(() => {
    testRes = Object.assign({}, mockedRes);
  });
  it('Should respond Hello world!!!', () => {
    chai
      .request(server)
      .get('/')
      .then(res => {
        expect(res.text).equal('Hello world!!!');
      })
      .catch(err => console.error(err));
  });
  it('Should add new route', () => {
    chai
      .request(server)
      .post(ENDPOINT_URL)
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
      .post(ENDPOINT_URL)
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
      .post(ENDPOINT_URL)
      .send(testRes)
      .then(res => {
        expect(res).to.have.status(400);
        expect(res.body.message).equal(`Method ${testRes.method} not allowed.`);
      });
  });
});
