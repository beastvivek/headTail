const { headMain } = require('./src/headLib.js');
const { exit } = require('process');
const fs = require('fs');

const main = () => {
  let exitCode;
  try {
    exitCode = headMain(fs.readFileSync, console, process.argv.slice(2));
  } catch (error) {
    console.error(error.message);
  } finally {
    exit(exitCode);
  }
};

main();
