const Buffer = require('./buffer');
const parseHeader = require('./header');
const parseVersion1 = require('./version1');

const parse = buffer => {
  if (!buffer || buffer.length === 0) {
    throw new Error('Empty buffer');
  }

  const [offset, version] = parseHeader(buffer);
  if (version === 1) {
    return parseVersion1(new Buffer(buffer, offset));
  }
  throw new Error(`Unknown version ${version}`);
};

module.exports = parse;
