const { headMain } = require('./src/headLib.js');
const fs = require('fs');

const main = () => {
  try {
    return headMain(fs.readFileSync, process.argv.slice(2));
  } catch (error) {
    return error.message;
  }
};

console.log(main());
