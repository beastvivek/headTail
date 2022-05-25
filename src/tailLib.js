const { splitLines, joinLines } = require('./stringUtils.js');

const lastNLines = (lines, limit) => lines.slice(-limit);
const lastNBytes = (text, limit) => text.slice(-limit);

const extractLines = (content, count) => {
  const lines = splitLines(content);
  const slicedLines = lastNLines(lines, count);
  return joinLines(slicedLines);
};

const tail = (content, { flag, count }) => {
  if (flag === 'line') {
    return extractLines(content, count);
  }
  return lastNBytes(content, count);
};

const tailMain = (readFile, fileName) => {
  let content;
  try {
    content = readFile(fileName, 'utf8');
  } catch (error) {
    throw {
      name: 'FileNotFound',
      message: `tail: ${fileName}: No such file or directory`
    };
  }
  return tail(content, { flag: 'line', count: 10 });
};

exports.lastNLines = lastNLines;
exports.tail = tail;
exports.lastNBytes = lastNBytes;
exports.extractLines = extractLines;
exports.tailMain = tailMain;
