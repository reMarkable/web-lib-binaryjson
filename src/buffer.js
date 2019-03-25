class Buffer {

  constructor(buffer, offset = 0) {
    this.buffer = buffer;
    this.offset = offset;
  }

  readInteger() {
    const value = this.buffer.readUInt32LE(this.offset);
    this.offset += 4;
    return value;
  }

  readShort() {
    const value = this.buffer.readInt16LE(this.offset)
    this.offset += 2;
    return value;
  }

  readDouble() {
    const value = this.buffer.readDoubleLE(this.offset);
    this.offset += 8;
    return value;
  }

  readString(len, encoding = 'utf8') {
    const value = this.buffer.toString(encoding, this.offset, this.offset+len);
    this.offset += len;
    return value;
  }

  peekInteger(offset = 0) {
    return this.buffer.readUInt32LE(this.offset + offset);
  }

  resetOffset(offset = 0) {
    this.offset = offset;
  }

  withOffset(offset) {
    return new Buffer(this.buffer, offset);
  }
}

module.exports = Buffer;
