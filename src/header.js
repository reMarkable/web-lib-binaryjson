const QBJS_TAG = 'qbjs';
const QBJS_SUPPORTED_VERSION_MIN = 1;
const QBJS_SUPPORTED_VERSION_MAX = 1;

const parseHeader = buffer => {
  if (buffer.slice(0, QBJS_TAG.length).toString() !== QBJS_TAG) {
    throw new Error('Invalid header');
  }

  const version = buffer.readInt32LE(QBJS_TAG.length);
  if (version < QBJS_SUPPORTED_VERSION_MIN || version > QBJS_SUPPORTED_VERSION_MAX) {
    throw new Error(`Unsupported version: ${version}`);
  }

  return [QBJS_TAG.length + 4, version];
};

module.exports = parseHeader;
