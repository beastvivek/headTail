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

const head = (content, option) => {
  if (option.key === 'lineCount') {
    return grabNLines(content, option.value);
  }
  return grabNCharacters(content, option.value);
};

const headMain = (readFile, args) => {
  let content, result = '';
  if (args[0] === '--help' || args.length === 0) {
    return 'usage: head[-n lines | -c bytes][file ...]';
  }
  const { fileNames, option } = parseArgs(args);
  for (let index = 0; index < fileNames.length; index++) {
    try {
      content = readFile(fileNames[index], 'utf8');
    } catch (error) {
      throw { name: 'FileReadError', message: 'Cannot read the file' };
    }
    result += head(content, option);
  }
  return result;
};

exports.sliceLines = sliceLines;
exports.grabNLines = grabNLines;
exports.grabNCharacters = grabNCharacters;
exports.headMain = headMain;
exports.head = head;
