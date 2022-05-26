const { headMain } = require('./src/headLib.js');
const fs = require('fs');

const main = () => {
  let exitCode = 1;
  try {
    exitCode = headMain(fs.readFileSync, console, process.argv.slice(2));
  } catch (error) {
    console.error(error.message);
  } finally {
    process.exit(exitCode);
  }
};

main();
