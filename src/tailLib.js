const { splitLines, joinLines } = require('./stringUtils.js');

const lastNLines = (lines, limit) => lines.slice(-limit);
const lastNBytes = (text, limit) => text.slice(-limit);

const tail = (content, { flag, count }) => {
  if (flag === 'line') {
    const lines = splitLines(content);
    const slicedLines = lastNLines(lines, count);
    return joinLines(slicedLines);
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
