const illegalOptionError = (option) => {
  return {
    name: 'IllegalOption',
    message: `head: illegal option -- ${option}
usage: head[-n lines | -c bytes][file ...]`
  };
};

const illegalValueError = (key, value) => {
  return {
    name: 'IllegalValue',
    message: `head: illegal ${key} count -- ${value}`
  };
};

const cantCombineError = () => {
  return {
    name: 'IllegalCombination',
    message: 'head: can\'t combine line and byte counts'
  };
};

const validateValue = (option, value) => {
  if (!isFinite(value) || +value <= 0) {
    throw illegalValueError(option, value);
  }
};

const isIllegalOption = (option) => {
  return !option.startsWith('-c') && !option.startsWith('-n');
};

const areOptionsLeft = (option) => {
  return option.startsWith('-');
};

const addDefaultsIfEmpty = (option) => {
  if (Object.keys(option).length === 0) {
    return { key: 'line', value: 10 };
  }
  return option;
};

const getOption = (args, index) => {
  const keys = { '-n': 'line', '-c': 'byte' };
  const [option, count] = args.slice(index, index + 2);
  const key = keys[option];
  validateValue(key, count);
  const value = +count;
  return { key, value };
};

const bothOptionsGiven = (args) => {
  return args.includes('-c') && args.includes('-n');
};

const generateObject = (separatedArgs) => {
  const parsedOption = { fileNames: [], option: {} };
  let index = 0;
  while (areOptionsLeft(separatedArgs[index])) {
    if (isIllegalOption(separatedArgs[index])) {
      throw illegalOptionError(separatedArgs[index].slice(1, 2));
    }
    parsedOption.option = getOption(separatedArgs, index);
    index += 2;
  }
  parsedOption.fileNames = separatedArgs.slice(index);
  parsedOption.option = addDefaultsIfEmpty(parsedOption.option);
  return parsedOption;
};

const parseArgs = args => {
  if (args.length === 0) {
    throw {
      name: 'FileNotFound',
      message: 'usage: head[-n lines | -c bytes][file ...]'
    };
  }
  const separatedArgs = separateArgsandValues(args);
  const parsedArgs = generateObject(separatedArgs);
  if (bothOptionsGiven(separatedArgs.join(''))) {
    throw cantCombineError();
  }
  return parsedArgs;
};

const isCombinedOption = (text) => {
  return text.startsWith('-') && (/\d/.test(text) || text.length > 2);
};

const isOnlyNumber = (option) => {
  const [, character] = option;
  const numbers = '1234567890';
  return numbers.includes(character);
};

const addOption = (separatedArgs, element) => {
  if (isCombinedOption(element)) {
    let [sign, char, ...value] = element;
    let option = sign + char;
    if (isOnlyNumber(element)) {
      [sign, ...value] = element;
      option = '-n';
    }
    separatedArgs.push(option, value.join(''));
    return separatedArgs;
  }
  separatedArgs.push(element);
  return separatedArgs;
};

const separateArgsandValues = (args) => {
  return args.reduce(addOption, []);
};

exports.parseArgs = parseArgs;
exports.getOption = getOption;
exports.addDefaultsIfEmpty = addDefaultsIfEmpty;
exports.generateObject = generateObject;
exports.isCombinedOption = isCombinedOption;
