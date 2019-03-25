const parseObject = require('./object');
const parseArray = require('./array');

const parseVersion1 = buffer => {
  const header = buffer.peekInteger(4);
  if ((header & 0x1) === 1) {
    return parseObject(buffer);
  }
  return parseArray(buffer);
};

module.exports = parseVersion1;
