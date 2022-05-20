const { splitLines, joinLines } = require('./stringUtils.js');

const sliceLines = (lines, limit) => lines.slice(0, limit);

const head = (content, lineCount) => {
  const lines = splitLines(content);
  const filteredLines = sliceLines(lines, lineCount);
  return joinLines(filteredLines);
};

const main = () => {
  return head('one\ntwo', 10);
};

exports.sliceLines = sliceLines;
exports.head = head;
exports.main = main;
