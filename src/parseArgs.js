const addDefaultValue = (options) => {
  const stringedObject = JSON.stringify(options);
  const parsedObj = JSON.parse(stringedObject);
  if (Object.keys(parsedObj.option).length === 0) {
    parsedObj.option.key = 'lineCount';
    parsedObj.option.value = 10;
  }
  return parsedObj;
};

const addOption = (args, index, options) => {
  const stringedObject = JSON.stringify(options);
  const parsedObj = JSON.parse(stringedObject);
  const keys = { '-n': 'lineCount', '-c': 'characterCount' };
  const [option, value] = args.slice(index, index + 2);
  const key = keys[option];
  if (parsedObj.option.key !== undefined && key !== parsedObj.option.key) {
    throw {
      name: 'IllegalOption',
      message: 'usage: head[-n lines | -c bytes][file ...]'
    };
  }
  parsedObj.option.key = key;
  parsedObj.option.value = +value;
  return parsedObj;
};

const parseArgs = args => {
  let options = { fileNames: [], option: {} };
  let index = 0;
  const regex = /^-/;
  while (regex.test(args[index])) {
    options = addOption(args, index, options);
    index += 2;
  }
  options.fileNames = args.slice(index);
  options = addDefaultValue(options);
  return options;
};

exports.parseArgs = parseArgs;
exports.addOption = addOption;
exports.addDefaultValue = addDefaultValue;
