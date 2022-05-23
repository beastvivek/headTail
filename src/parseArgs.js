const { validateInput, throwIllegalOptionError } = require('./validations.js');

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
  validateInput(parsedObj, key, value);
  parsedObj.option.key = key;
  parsedObj.option.value = +value;
  return parsedObj;
};

const addIfSingle = (obj, args, index) => {
  const options = addOption(args, index, obj);
  return { options, increment: 2 };
};

const addIfCombined = (args, index, obj) => {
  const key = args[index].slice(0, 2);
  const value = args[index].slice(2);
  const options = addOption([key, value], 0, obj);
  return { options, increment: 1 };
};

const addIfNoOption = (obj, args, index) => {
  const options = addOption(['-n', args[index].slice(1)], 0, obj);
  return { options, increment: 1 };
};

const addValidArgs = (args, index, obj) => {
  let increment, options;
  if (/^-[0-9]/.test(args[index])) {
    ({ options, increment } = addIfNoOption(obj, args, index, increment));
  }
  if (/^-[cn][0-9]/.test(args[index])) {
    ({ options, increment } = addIfCombined(args, index, obj, increment));
  }
  if (/^-[cn]$/.test(args[index])) {
    ({ options, increment } = addIfSingle(obj, args, index, increment));
  }
  return { options, increment };
};

const parseArgs = args => {
  let options = { fileNames: [], option: {} }, index = 0, increment = 0;
  while (/^-/.test(args[index])) {
    if (/-[^cn0-9]/.test(args[index])) {
      throwIllegalOptionError();
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
