console.log('usage: tail [-c # | -n #] [file ...]');
const { tailMain } = require('./src/tailLib.js');
const fs = require('fs');

const main = () => {
  try {
    console.log(tailMain(fs.readFileSync, ...process.argv.slice(2)));
  } catch (error) {
    console.error(error.message);
  }
};

main();
