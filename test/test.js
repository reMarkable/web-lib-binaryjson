const fs = require('fs');
const parse = require('../src/index');

describe('binary JSON parser', () => {

  test('it parses the sample', () => {
    const sample = fs.readFileSync('./sample/sample.dat');
    const results = parse(sample);
    expect(results).toEqual({
      id: 'Das auto ist das bestest',
      page: '123',
      layer: '4',
      foo: {
        'foo': 'banarama',
        'bar': 1234.56,
      },
      type: 'foo',
    });
  });

});
