const { parseArgs } = require('./headParser.js');
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
  if (option.flag === 'line') {
    return grabNLines(content, option.count);
  }
  return grabNCharacters(content, option.count);
};

const formatHeader = ({ fileName, content }) => {
  return `==> ${fileName} <==\n${content}\n`;
};

const processFile = (fileName, readFile, option) => {
  const result = { fileName };
  try {
    const content = readFile(fileName, 'utf8');
    result.content = head(content, option);
  } catch (error) {
    result.error = `head: ${fileName}: No such file or directory`;
  }
  return result;
};

const identity = (element) => element.content;

const print = (result, std, formatter) => {
  if (result.error) {
    std.error(result.error);
    return;
  }
  std.log(formatter(result));
};

const determineExitCode = function (results) {
  return results.find((result) => result.error) ? 1 : 0;
};

const isMultiFile = (fileNames) => fileNames.length > 1;

const decideFormatter = (fileNames) => {
  return isMultiFile(fileNames) ? formatHeader : identity;
};

const headMain = (readFile, std, args) => {
  const { fileNames, option } = parseArgs(args);
  const results = fileNames.map(file => processFile(file, readFile, option));
  const formatter = decideFormatter(fileNames);
  results.forEach((result) => print(result, std, formatter));
  return determineExitCode(results);
};

exports.sliceLines = sliceLines;
exports.grabNLines = grabNLines;
exports.grabNCharacters = grabNCharacters;
exports.headMain = headMain;
exports.head = head;
exports.formatHeader = formatHeader;
exports.determineExitCode = determineExitCode;
