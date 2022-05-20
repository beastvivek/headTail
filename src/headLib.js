const sliceLines = (lines) => lines;

const head = (content) => {
  const lines = content.split('\n');
  const filteredLines = sliceLines(lines);
  return filteredLines.join('\n');
};

exports.sliceLines = sliceLines;
exports.head = head;
