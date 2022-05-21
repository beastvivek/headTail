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

const parseArgs = args => {
  return {
    fileName: args
  };
};

const headMain = (readFile, filePath) => {
  let content;
  try {
    content = readFile(filePath, 'utf8');
  } catch (error) {
    throw { name: 'FileReadError', message: 'Cannot read the file' };
  }
  return head(content, { lineCount: 10 });
};

exports.sliceLines = sliceLines;
exports.grabNLines = grabNLines;
exports.grabNCharacters = grabNCharacters;
exports.headMain = headMain;
exports.parseArgs = parseArgs;
exports.head = head;
