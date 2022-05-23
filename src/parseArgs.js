const { validateInput, illegalOptionError } = require('./validations.js');

const isIllegalOption = (option) => {
  return /-[^cn0-9]/.test(option);
};

const optionsAreLeft = (option) => {
  return /^-/.test(option);
};

const addDefaultsIfEmpty = (option) => {
  if (Object.keys(option).length === 0) {
    return { key: 'line', value: 10 };
  }
  return option;
};

const getOption = (args, index, options) => {
  const keys = { '-n': 'line', '-c': 'byte' };
  const [option, count] = args.slice(index, index + 2);
  const key = keys[option];
  const value = +count;
  validateInput(options, key, value);
  return { key, value };
};

const parseArgs = args => {
  const options = { fileNames: [], option: {} };
  const separatedArgs = separateArgsandValues(args);
  let index = 0;
  while (optionsAreLeft(separatedArgs[index])) {
    if (isIllegalOption(separatedArgs[index])) {
      throw illegalOptionError(separatedArgs[index].slice(1, 2));
    }
    options.option = getOption(separatedArgs, index, options.option);
    index += 2;
  }
  options.fileNames = separatedArgs.slice(index);
  options.option = addDefaultsIfEmpty(options.option);
  return options;
};

const separateArgsandValues = (args) => {
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
exports.getOption = getOption;
exports.addDefaultValue = addDefaultsIfEmpty;
