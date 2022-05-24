const { splitLines, joinLines } = require('../lib/stringUtils.js');

const lastNLines = (lines, limit) => lines.slice(-limit);

const tail = (content, { count }) => {
  const lines = splitLines(content);
  const slicedLines = lastNLines(lines, count);
  return joinLines(slicedLines);
};

exports.lastNLines = lastNLines;
exports.tail = tail;
