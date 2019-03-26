import TYPES from './types';
import parseString from './string';
import parseArray from './array';

const parseKeyValue = buffer => {
  const header = buffer.readInteger();
  const type = header & 0x7;
  const latinOrIntValue = (header >> 3) & 0x1;
  const latinKey = (header >> 4) & 0x1;
  let value = (header >> 5) & 0x7FFFFFF;
  if ((value >> 26) === 1) {
    value = value - (1 << 27);
  }

  const key = parseString(buffer, latinKey);
  switch (type) {
    case TYPES.Null: return [key, null];
    case TYPES.Bool: return [key, (value !== 0)];
    case TYPES.Object: return [key, parseObject(buffer)];
    case TYPES.Array: return [key, parseArray(buffer)];
    case TYPES.String: return [key, parseString(buffer, latinOrIntValue)];
    case TYPES.Double: {
      if (latinOrIntValue) {
        return [key, value];
      }
      return [key, buffer.readDouble()];
    }

    default:
      throw new Error(`Unknown object type ${type}`);
  }
};

const parseObject = buffer => {
  const offset = buffer.offset;
  const size = buffer.readInteger();
  const header = buffer.readInteger();
  const tableOffset = buffer.readInteger();

  const isObject = (header & 0x1) === 1;
  if (!isObject) {
    throw new Error('Non-object parsed as object');
  }

  const results = {};
  const length = header >> 1;
  for (let n=0; n<length; ++n) {
    const [key, value] = parseKeyValue(buffer);
    results[key] = value;
  }

  buffer.resetOffset(offset + size);
  return results;
};

export default parseObject;
