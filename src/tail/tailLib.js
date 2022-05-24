const NEWLINE = '\n';
const splitLines = (lines) => lines.split(NEWLINE);
const joinLines = (lines) => lines.join(NEWLINE);

const lastNLines = (lines) => lines.slice(-10);

const tail = (content) => {
  const lines = splitLines(content);
  const slicedLines = lastNLines(lines);
  return joinLines(slicedLines);
};

exports.lastNLines = lastNLines;
exports.tail = tail;
