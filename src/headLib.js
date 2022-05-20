const { splitLines, joinLines } = require('./stringUtils.js');

const sliceLines = (lines, limit) => lines.slice(0, limit);

const grabNLines = (content, lineCount) => {
  const lines = splitLines(content);
  const slicedLines = sliceLines(lines, lineCount);
  return joinLines(slicedLines);
};

const grabNCharacters = (content, characterCount) => {
  return content.slice(0, characterCount);
};

const head = () => {
  return grabNLines('one\ntwo', 10);
};

exports.sliceLines = sliceLines;
exports.grabNLines = grabNLines;
exports.grabNCharacters = grabNCharacters;
exports.head = head;
