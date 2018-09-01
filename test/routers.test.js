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
describe('Server', () => {
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
      .post('/endpoint')
      .send(mokedRes)
      .then(res => {
        expect(res.status).equal(200);
        expect(res.text).equal('Endpoint created!');
      })
      .catch(err => console.error(err));
  });
});
