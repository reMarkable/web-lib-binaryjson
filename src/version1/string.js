const parseString = (buffer, isLatin) => {
  let len, encoding;
  if (isLatin) {
    len = buffer.readShort();
    encoding = 'utf8';
  } else {
    len = buffer.readInteger() * 2;
    encoding = 'utf16le';
  }

  const str = buffer.readString(len, encoding);
  // Round the size up to the next 4 byte boundary
  buffer.resetOffset((buffer.offset + 3) & ~3);
  return str;
};

export default parseString;
