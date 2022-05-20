const { splitLines, joinLines } = require('./stringUtils.js');

const sliceLines = (lines) => lines.slice(0, 10);

const head = (content) => {
  const lines = splitLines(content);
  const filteredLines = sliceLines(lines);
  return joinLines(filteredLines);
};

const main = () => {
  return head('one\ntwo');
};

exports.sliceLines = sliceLines;
exports.head = head;
exports.main = main;
