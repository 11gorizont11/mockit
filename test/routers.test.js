import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { server } from '../src/main';

chai.use(chaiHttp);

const mokedRes = {
  statusCode: 200,
  method: 'GET',
  path: '/some-url',
  body: {
    key: '10',
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
        // expect(res).to.have.status(200);
        // console.log(res.text);
        expect(res.text).equal('Endpoint created!');
      })
      .catch(err => console.error(err));
  });
});
