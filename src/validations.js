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

const validateInput = (options, option, value) => {
  const previousKey = options.key;
  if (previousKey !== undefined && option !== previousKey) {
    throw cantCombineError();
  }
  if (+value <= 0 || !isFinite(value)) {
    throw illegalValueError(option, value);
  }
};

exports.illegalOptionError = illegalOptionError;
exports.validateInput = validateInput;
