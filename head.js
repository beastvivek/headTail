const { headMain } = require('./src/headLib.js');
const fs = require('fs');

// console.log('usage: head [-n lines | -c bytes] [file ...]');
const main = () => {
  return headMain(fs.readFileSync, process.argv.slice(2));
};

console.log(main());
