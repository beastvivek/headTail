const { splitLines, joinLines } = require('../lib/stringUtils.js');

const lastNLines = (lines, limit) => lines.slice(-limit);
const lastNBytes = (text, limit) => text.slice(-limit);

const tail = (content, { count }) => {
  const lines = splitLines(content);
  const slicedLines = lastNLines(lines, count);
  return joinLines(slicedLines);
};

// eslint-disable-next-line no-unused-vars
const tailMain = () => {
  return tail('h\nb\nh', { count: 10 });
};

exports.lastNLines = lastNLines;
exports.tail = tail;
exports.lastNBytes = lastNBytes;
