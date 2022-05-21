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
  let content, index = 0, result = '';
  const { fileNames, option } = parseArgs(args);
  while (index < fileNames.length) {
    try {
      content = readFile(fileNames[index], 'utf8');
    } catch (error) {
      throw { name: 'FileReadError', message: 'Cannot read the file' };
    }
    result += head(content, option);
    index += 1;
  }
  return result;
};

exports.sliceLines = sliceLines;
exports.grabNLines = grabNLines;
exports.grabNCharacters = grabNCharacters;
exports.headMain = headMain;
exports.head = head;
