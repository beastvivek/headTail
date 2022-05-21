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

// eslint-disable-next-line max-statements
const parseArgs = args => {
  const keys = { '-n': 'lineCount', '-c': 'characterCount' };
  const options = { fileName: [], option: {} };
  const regex = /^-/;
  for (let index = 0; index < args.length; index++) {
    if (args[index].match(regex)) {
      const [option, value] = args.slice(index, index + 2);
      const key = keys[option];
      options.option[key] = +value;
      index += 1;
    } else {
      options.fileName.push(args[index]);
    }
  }
  if (Object.keys(options.option).length === 0) {
    options.option['lineCount'] = 10;
  }
  return options;
};

const headMain = (readFile, args) => {
  let content;
  const { fileName, option } = parseArgs(args);
  try {
    content = readFile(fileName[0], 'utf8');
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
