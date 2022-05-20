const NEWLINE = '\n';
const sliceLines = (lines) => lines.slice(0, 10);
const splitLines = (lines) => lines.split(NEWLINE);
const joinLines = (lines) => lines.join(NEWLINE);

const head = (content) => {
  const lines = splitLines(content);
  const filteredLines = sliceLines(lines);
  return joinLines(filteredLines);
};

const main = () => {
  return head('one\ntwo');
};

exports.sliceLines = sliceLines;
exports.head = head;
exports.main = main;
