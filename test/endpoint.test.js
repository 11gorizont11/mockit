import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
chai.use(chaiHttp);
import { server } from '../src/main';

const mokedRes = {
  statusCode: 200,
  method: 'GET',
  path: '/olol',
  body: {
    key: '1',
    message: 'it new'
  }
};

describe('Endpoint Spec', () => {
  let testRequester;
  beforeEach(() => {
    testRequester = chai.request(server).keepOpen();
    testRequester.post('/endpoint').send(mokedRes);
  });
  afterEach(() => {
    testRequester.close();
  });

  it('Should return moked values', () => {
    testRequester
      .get(mokedRes.path)
      .then(res => {
        expect(res).to.have.status(mokedRes.statusCode);
        expect(res.body).eqls(mokedRes.body);
      })
      .catch(err => console.error(err));
  });

  it('Should return Error if path and method existed', () => {
    testRequester
      .post('/endpoint')
      .send(mokedRes)
      .then(res => {
        expect(res).to.have.status(405);
        expect(res).text(
          `Route with Path ${mokedRes.path} and Method ${
            mokedRes.method
          } has existed already.`
        );
      })
      .catch(err => console.error(err));
  });
});
