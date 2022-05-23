const { validateInput, throwIllegalOptionError } = require('./validations.js');

const addDefaultValue = (options) => {
  const stringedObject = JSON.stringify(options);
  const parsedObj = JSON.parse(stringedObject);
  if (Object.keys(parsedObj.option).length === 0) {
    parsedObj.option.key = 'line';
    parsedObj.option.value = 10;
  }
  return parsedObj;
};

const addOption = (args, index, options) => {
  const stringedObject = JSON.stringify(options);
  const parsedObj = JSON.parse(stringedObject);
  const keys = { '-n': 'line', '-c': 'byte' };
  const [option, value] = args.slice(index, index + 2);
  const key = keys[option];
  validateInput(parsedObj, key, value);
  parsedObj.option.key = key;
  parsedObj.option.value = +value;
  return parsedObj;
};

const parseArgs = args => {
  let options = { fileNames: [], option: {} }, index = 0;
  const separatedArgs = separateArgs(args);
  while (/^-/.test(separatedArgs[index])) {
    if (/-[^cn0-9]/.test(separatedArgs[index])) {
      throwIllegalOptionError(separatedArgs[index].slice(1, 2));
    }
    options = addOption(separatedArgs, index, options);
    index += 2;
  }
  options.fileNames = separatedArgs.slice(index);
  options = addDefaultValue(options);
  return options;
};

const separateArgs = (args) => {
  const separatedArgs = [];
  args.forEach(element => {
    if (element.startsWith('-') && /[0-9]/.test(element)) {
      let [sign, char, ...value] = element;
      let option = sign + char;
      if (/^-[0-9]/.test(element)) {
        [sign, ...value] = element;
        option = '-n';
      }
      separatedArgs.push(option, value.join(''));
    } else {
      separatedArgs.push(element);
    }
  });
  return separatedArgs;
};

exports.parseArgs = parseArgs;
exports.addOption = addOption;
exports.addDefaultValue = addDefaultValue;
