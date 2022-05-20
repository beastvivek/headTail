const sliceLines = (lines) => lines.slice(0, 10);
const splitLines = (lines) => lines.split('\n');
const joinLines = (lines) => lines.join('\n');

const head = (content) => {
  const lines = splitLines(content);
  const filteredLines = sliceLines(lines);
  return joinLines(filteredLines);
};

exports.sliceLines = sliceLines;
exports.head = head;
