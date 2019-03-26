import parseObject from './object';
import parseArray  from './array';

const parseVersion1 = buffer => {
  const header = buffer.peekInteger(4);
  if ((header & 0x1) === 1) {
    return parseObject(buffer);
  }
  return parseArray(buffer);
};

export default parseVersion1;
