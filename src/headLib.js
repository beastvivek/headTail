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

const identity = (ele) => ele.content;

const print = (res, std, formatter) => {
  if (res.error) {
    std.error(res.error);
    return;
  }
  std.log(formatter(res));
};

const determineExitCode = function (results) {
  return results.find((res) => res.error) ? 1 : 0;
};

const isMultiFile = (fileNames) => fileNames.length > 1;

const decideFormatter = (fileNames) => {
  return isMultiFile(fileNames) ? formatHeader : identity;
};

const headMain = (readFile, std, args) => {
  const { fileNames, option } = parseArgs(args);
  const results = fileNames.map(file => processFile(file, readFile, option));
  const formatter = decideFormatter(fileNames);
  results.forEach((res) => print(res, std, formatter));
  return determineExitCode(results);
};

exports.sliceLines = sliceLines;
exports.grabNLines = grabNLines;
exports.grabNCharacters = grabNCharacters;
exports.headMain = headMain;
exports.head = head;
