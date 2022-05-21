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

exports.parseArgs = parseArgs;
