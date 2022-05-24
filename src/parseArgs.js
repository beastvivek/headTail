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
  return /-[^cn\d]/.test(option);
};

const areOptionsLeft = (option) => {
  return /^-/.test(option);
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
  return /-c/.test(args) && /-n/.test(args);
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

const separateArgsandValues = (args) => {
  const separatedArgs = [];
  args.forEach(element => {
    if (isCombinedOption(element)) {
      let [sign, char, ...value] = element;
      let option = sign + char;
      if (/^-\d/.test(element)) {
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
