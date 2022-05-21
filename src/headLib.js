const { parseArgs } = require('./parseArgs.js');
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

const head = (content, options) => {
  if (options.lineCount !== undefined) {
    return grabNLines(content, options.lineCount);
  }
  return grabNCharacters(content, options.characterCount);
};

const headMain = (readFile, args) => {
  let content;
  const { fileName, option } = parseArgs(args);
  try {
    content = readFile(fileName[0], 'utf8');
  } catch (error) {
    throw { name: 'FileReadError', message: 'Cannot read the file' };
  }
  return head(content, option);
};

exports.sliceLines = sliceLines;
exports.grabNLines = grabNLines;
exports.grabNCharacters = grabNCharacters;
exports.headMain = headMain;
exports.head = head;
