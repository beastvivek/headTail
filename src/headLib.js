const { splitLines, joinLines } = require('./stringUtils.js');

const sliceLines = (lines, limit) => lines.slice(0, limit);

const grabNLines = (content, lineCount) => {
  const lines = splitLines(content);
  const filteredLines = sliceLines(lines, lineCount);
  return joinLines(filteredLines);
};

const main = () => {
  return grabNLines('one\ntwo', 10);
};

exports.sliceLines = sliceLines;
exports.grabNLines = grabNLines;
exports.main = main;
