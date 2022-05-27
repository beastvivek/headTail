const { headMain } = require('./src/headLib.js');
const fs = require('fs');

const main = (args) => {
  const { log, error } = console;
  const std = { log, error };
  try {
    process.exitCode = headMain(fs.readFileSync, std, args);
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
};

main(process.argv.slice(2));
