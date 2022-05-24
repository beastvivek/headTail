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
  if (option.key === 'line') {
    return grabNLines(content, option.value);
  }
  return grabNCharacters(content, option.value);
};

const formatHeader = (fileName, content) => {
  return `==> ${fileName} <==\n${content}\n`;
};

const headMain = (readFile, std, args) => {
  let content, exitCode = 0;
  if (args[0] === '--help' || args.length === 0) {
    std.error('usage: head[-n lines | -c bytes][file ...]');
    return 1;
  }
  const { fileNames, option } = parseArgs(args);
  fileNames.forEach((fileName) => {
    try {
      content = readFile(fileName, 'utf8');
      if (fileNames.length === 1) {
        std.log(head(content, option));
        return exitCode;
      }
    } catch (error) {
      std.error(`head: ${fileName}: No such file or directory`);
      exitCode = 1;
      return exitCode;
    }
    std.log(formatHeader(fileName, head(content, option)));
  });
  return exitCode;
};

exports.sliceLines = sliceLines;
exports.grabNLines = grabNLines;
exports.grabNCharacters = grabNCharacters;
exports.headMain = headMain;
exports.head = head;
