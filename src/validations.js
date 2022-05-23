const throwIllegalOptionError = () => {
  throw {
    name: 'IllegalOption',
    message: 'usage: head[-n lines | -c bytes][file ...]'
  };
};

const throwIllegalValueError = () => {
  throw {
    name: 'IllegalValue',
    message: 'head: illegal value -- 0'
  };
};

const validateInput = (parsedObj, key, value) => {
  const previousKey = parsedObj.option.key;
  if (previousKey !== undefined && key !== previousKey) {
    throwIllegalOptionError();
  }
  if (value === '0') {
    throwIllegalValueError();
  }
};

exports.throwIllegalOptionError = throwIllegalOptionError;
exports.validateInput = validateInput;
