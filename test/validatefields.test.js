import { validateFields } from '../src/services';
import { expect } from 'chai';
describe('validation fields', () => {
  const testObj = {
    statusCode: 200,
    path: '/test',
    body: {
      key: 'value'
    }
  };

  const rules = {
    statusCode: { type: 'Number', require: true },
    path: { type: 'String', require: true },
    method: { type: 'String', require: true },
    body: { type: 'Object' }
  };
  it('should return Error if object has not fields', () => {
    expect(validateFields(testObj, rules).join()).equal('method is required.');
  });

  it('should return type Error if field has different type', () => {
    testObj.method = 5;
    expect(validateFields(testObj, rules).join()).equal(
      'method should be String type.'
    );
  });
});
