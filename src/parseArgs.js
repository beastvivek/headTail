const addDefaultValue = (options) => {
  const stringedObject = JSON.stringify(options);
  const parsedObj = JSON.parse(stringedObject);
  if (Object.keys(parsedObj.option).length === 0) {
    parsedObj.option.key = 'lineCount';
    parsedObj.option.value = 10;
  }
  return parsedObj;
};

const validateInput = (parsedObj, key, value) => {
  const previousKey = parsedObj.option.key;
  if (previousKey !== undefined && key !== previousKey) {
    throw {
      name: 'IllegalOption',
      message: 'usage: head[-n lines | -c bytes][file ...]'
    };
  }
  if (value === '0') {
    throw {
      name: 'IllegalValue',
      message: 'head: illegal value -- 0'
    };
  }
};

const addOption = (args, index, options) => {
  const stringedObject = JSON.stringify(options);
  const parsedObj = JSON.parse(stringedObject);
  const keys = { '-n': 'lineCount', '-c': 'characterCount' };
  const [option, value] = args.slice(index, index + 2);
  const key = keys[option];
  validateInput(parsedObj, key, value);
  parsedObj.option.key = key;
  parsedObj.option.value = +value;
  return parsedObj;
};

const addValidArgs = (args, index, options, increment) => {
  if (/^-[0-9]/.test(args[index])) {
    options = addOption(['-n', args[index].slice(1)], 0, options);
    increment = 1;
  }
  if (/^-[cn][0-9]/.test(args[index])) {
    const key = args[index].slice(0, 2);
    const value = args[index].slice(2);
    options = addOption([key, value], 0, options);
    increment = 1;
  }
  if (/^-[cn]$/.test(args[index])) {
    options = addOption(args, index, options);
    increment = 2;
  }
  return { options, increment };
};

const parseArgs = args => {
  let options = { fileNames: [], option: {} }, index = 0, increment = 0;
  while (/^-/.test(args[index])) {
    if (/-[^cn0-9]/.test(args[index])) {
      throw {
        name: 'IllegalOption',
        message: 'usage: head[-n lines | -c bytes][file ...]'
      };
    }
    ({ options, increment } = addValidArgs(args, index, options, increment));
    index += increment;
  }
  options.fileNames = args.slice(index);
  options = addDefaultValue(options);
  return options;
};

exports.parseArgs = parseArgs;
exports.addOption = addOption;
exports.addDefaultValue = addDefaultValue;
