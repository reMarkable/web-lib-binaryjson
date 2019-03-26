import * as fs from 'fs';
import parse from '../src/index';

const loremIpsum = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?';

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

  test('it parses the array sample', () => {
    const array = fs.readFileSync('./sample/array.dat');
    const results = parse(array);
    expect(results).toEqual([
      1,
      2,
      '333',
      213123213232.1232,
      {
        shortString: 'banarama',
        longString: loremIpsum,
        smallDouble: 0.00000123,
        largeDouble: 1236752167366.0,
      },
      true,
      1263876123,
      'asdlkjaslkjdklsajd',
      'Das auto ist das bestest',
    ]);
  });

  test('it parses the complex sample', () => {
    const complex = fs.readFileSync('./sample/complex.dat');
    const results = parse(complex);

    const arr1 = [ 1, 2, '333', 213123213232.1232 ];
    const obj1 = {
      shortString: 'banarama',
      longString: loremIpsum,
      smallDouble: 0.00000123,
      largeDouble: 1236752167366.0,
    };
    const obj2 = {
      foo: 'banarama',
      bar: 1234.56,
      obj1: obj1,
      arr1: arr1,
      trve: true,
      grim: false,
    };
    const arr2 = [
      'Das auto ist das bestest',
      'Das auto ist das bestest',
      1, 
      1263876123,
      213123213232.123213,
      obj1,
      0.000002132,
      obj2,
      arr1,
      true,
      1,
      false,
      -1654213,
      0,
    ];
    expect(results).toEqual({
      id: 'Das auto ist das bestest',
      page: '123',
      'Das auto ist das bestest': '7213987123',
      obj1: obj1,
      arr2: arr2,
      negative: -12321312,
      negative2: -12321312.213761273,
    });
  });

});
