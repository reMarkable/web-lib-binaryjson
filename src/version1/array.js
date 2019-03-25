const TYPES = require('./types');
const parseString = require('./string');
const parseObject = require('./object');

const parseValue = (buffer, table) => {
  const header = table.readInteger();
  const type = header & 0x7;
  const latinOrIntValue = (header >> 3) & 0x1;
  const latinKey = (header >> 4) & 0x1;
  let value = (header >> 5) & 0x7FFFFFF;
  if ((value >> 26) === 1 ) {
    value = value - (1 << 27);
  }

  switch (type) {
    case TYPES.Null: return null;
    case TYPES.Bool: return (value !== 0);
    case TYPES.Double: return latinOrIntValue ? value : buffer.withOffset(value).readDouble();
    case TYPES.String: parseString(buffer.withOffset(value), latinOrIntValue);
    case TYPES.Array: parseArray(buffer.withOffset(value));
    case TYPES.Object: parseObject(buffer.withOffset(value));

    default:
      throw new Error(`Unknown array type ${type}`);
  }
};

//TODO: This one is probably completely broken!!!
const parseArray = buffer => {
  const offset = buffer.offset;
  const bytes = buffer.readInteger();
  const size = buffer.readInteger();
  const tableOffset = buffer.readInteger();

  const count = size >> 1;
  const table = buffer.withOffset(offset + tableOffset);

  let results = [];
  for (let n = 0; n < count; ++n) {
    buffer.resetOffset(offset);
    results.push(parseValue(buffer, table));
  }

  buffer.resetOffset(offset + bytes);
  return results;
};

module.exports = parseArray;
