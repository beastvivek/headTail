const { splitLines, joinLines } = require('../lib/stringUtils.js');

const lastNLines = (lines) => lines.slice(-10);

const tail = (content) => {
  const lines = splitLines(content);
  const slicedLines = lastNLines(lines);
  return joinLines(slicedLines);
};

exports.lastNLines = lastNLines;
exports.tail = tail;
