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
  parsedObj.option.key = key;
  parsedObj.option.value = +value;
  return parsedObj;
};

const parseArgs = args => {
  let options = { fileNames: [], option: {} };
  for (let index = 0; index < args.length; index++) {
    const regex = /^-/;
    if (args[index].match(regex)) {
      options = addOption(args, index, options);
      index += 1;
    } else {
      options.fileNames.push(args[index]);
    }
  }
  options = addDefaultValue(options);
  return options;
};

exports.parseArgs = parseArgs;
exports.addOption = addOption;
exports.addDefaultValue = addDefaultValue;
