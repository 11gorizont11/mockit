import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { server } from '../src/main';

chai.use(chaiHttp);

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
});
