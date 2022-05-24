## **TAIL**
---
**TODO**
- [ ] Set default object in the outer function
- [ ] Make a function that works for byte count
- [ ] Make tail function work for line and byte count

**MAYBE**

**DONE**
- [x] Use object for passing the count of lines
- [x] Give limit to lastNLines and tail
- [x] Move common functions to lib directory
- [x] Test tail function 
- [x] Create a function that will give array to lastNLines
- [x] Change contract of lastNLines, should take and return array
- [x] Tail should have a limit of ten lines max
- [x] Make tail work for multiline content
- [x] Create testTailLIb.js
- [x] Write a happy path for tail
- [x] Separate head and tail dir in src and test
- [x] Update README.md for tail

## **HEAD**
---
**TODO**
- [ ] Split the testParseArgs.js file
- [ ] Think another method instead of using regular expression
- [ ] Should print content of files present and error for non present files
 
**MAYBE**

**DONE**
- [x] Test isOnlyNumber and addOption 
- [x] Should return usage if file is not given
- [x] Test addDefaultsIfEmpty,generateObject and isCombinedOption
- [x] Reduce regular expressions
- [x] Refactor headMain
- [x] Should give illegal count if character is given instead of number
- [x] Should prioritize illegal option over combine option error
- [x] Refactored parseArgs.js
- [x] Used new approach for parseArgs.js
- [x] Should give the same error as head 
- [x] Separate error stream and output stream 
- [x] Separate validations from parseArgs.js
- [x] Extract functions in parseArgs.js
- [x] Refactor addValidArgs 
- [x] Change format of multiple file output
- [x] Refactor parseArgs
- [x] Make head work for no space between option and value
- [x] Reduce parseArgs function statements
- [x] If only -number is given then it should work on -n option
- [x] Work for multiple files
- [x] Should give usage for invalid option
- [x] Should give usage if no argument is given
- [x] Give error when 0 is given with the switches
- [x] Should give help if --help option is given
- [x] Give usage if both options are given by user 
- [x] Surround main with a try catch block
- [x] Use while for parseObj instead of for
- [x] Change head function's contract
- [x] Change the object structure
- [x] Make head work for multiple files as input
- [x] Don't set characterCount unless given
- [x] Test addDefaultValue and addOption functions
- [x] Refactor parseArgs function
- [x] Set default lineCount to 10 if no options are given
- [x] Make head work for single file with options
- [x] Move parseArgs to a new file
- [x] Parse options to object
- [x] Use parseArgs in headMain
- [x] Create a parse object function
- [x] Have a try catch for hadMain
- [x] Rename main in headLib.js
- [x] Create a main in head.js
- [x] Create main
- [x] Test main
- [x] Test head function
- [x] Send options as object to head
- [x] Call from head according to the object key
- [x] Split test file into testCharacterCount.js, testLineCount.js and testHead.js
- [x] No default value for characterCount
- [x] Implement characterCount(-c) option
- [x] Rename main to head 
- [x] Consider renaming head function
- [x] Hardcode value of lineCount(-n) in main 
- [x] Implement lineCount(-n) option
- [x] Consider moving splitLines, joinLines and NEWLINE functions to new file
- [x] Consider making `\n` as a constant
- [x] Create a main function 
- [x] Create separate functions for split and join
- [x] Test `head` function 
- [x] `sliceLines` should return only ten lines if more than ten lines are given
- [x] Create a function that converts string to array and passes to `sliceLines`
- [x] Consider changing the name of `head` function
- [x] Use array for `head` function instead of string
- [x] Consider a richer contract for `head`
- [x] Make `head` work for multiple lines
- [x] Change the contract for `head [...file]`
- [x] Take argument for the `head` function
- [x] Create `src` and `test` directories
- [x] Create `testHeadLib.js`
- [x] Write a happy path test case
- [x] Start with hard coded content