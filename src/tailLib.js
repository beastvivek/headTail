const { splitLines, joinLines } = require('./stringUtils.js');

const lastNLines = (lines, limit) => lines.slice(-limit);
const lastNBytes = (text, limit) => text.slice(-limit);

const extractLines = (content, count) => {
  const lines = splitLines(content);
  const slicedLines = lastNLines(lines, count);
  return joinLines(slicedLines);
};

const tail = (content, { flag, count }) => {
  if (flag === 'line') {
    return extractLines(content, count);
  }
  return lastNBytes(content, count);
};

// eslint-disable-next-line no-unused-vars
const tailMain = () => {
  return tail('h\nb\nh', { flag: 'line', count: 10 });
};

exports.lastNLines = lastNLines;
exports.tail = tail;
exports.lastNBytes = lastNBytes;
exports.extractLines = extractLines;
