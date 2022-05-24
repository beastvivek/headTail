const NEWLINE = '\n';
const splitLines = (lines) => lines.split(NEWLINE);
const joinLines = (lines) => lines.join(NEWLINE);

const tail = (content) => {
  const lines = splitLines(content);
  const slicedLines = lines.slice(-10);
  return joinLines(slicedLines);
};

exports.tail = tail;
