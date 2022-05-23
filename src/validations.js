const throwIllegalOptionError = (option) => {
  throw {
    name: 'IllegalOption',
    message: `head: illegal option -- ${option}
usage: head[-n lines | -c bytes][file ...]`
  };
};

const throwIllegalValueError = (key) => {
  throw {
    name: 'IllegalValue',
    message: `head: illegal ${key} count -- 0`
  };
};

const throwCantCombineError = () => {
  throw {
    name: 'IllegalCombination',
    message: 'head: can\'t combine line and byte counts'
  };
};

const validateInput = (parsedObj, key, value) => {
  const previousKey = parsedObj.option.key;
  if (previousKey !== undefined && key !== previousKey) {
    throwCantCombineError();
  }
  if (value === '0') {
    throwIllegalValueError(key);
  }
};

exports.throwIllegalOptionError = throwIllegalOptionError;
exports.validateInput = validateInput;
