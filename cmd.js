#!/usr/bin/env node

var gwylio = require('./gwylio');
var init = gwylio.init;
var watch = gwylio.watch;
var chalk = require('chalk');
var program = require('commander');

program
  .version('0.0.1')
  .option('-s, --src [dir or glob]', 'The source folder with no trailing slash (eg: my/src)')
  .option('-d, --dest [dir]', 'The top level dir to copy to with no trailing slash (eg: my/dest) (folder structure will be copied too)')
  .option('-f, --files [list]', 'Comma seperated list of files to watch (eg: this.js,*.txt,**/*.md)')
  //.option('-i, --ignore [list]', 'Comma seperated list of file types to ignore (html). This takes presidence over the watch list')
  .parse(process.argv);

if (!program.src || !program.files) return console.error(chalk.red.bold('⊂(✖_✖)つ D\'oh! Tell me what to watch dummy'));
if (!program.dest) return console.error(chalk.red.bold('⊂(✖_✖)つ D\'oh! Tell me where to copy changes to'));

var src,
    dest,
    fileTypes,
    files,
    ignore,
    reWS = / /g;

function removeWhiteSpace(str) {
  return str.replace(reWS, '');
}

if (program.src) {
  src = removeWhiteSpace(program.src);
}

if (program.dest) {
  dest = removeWhiteSpace(program.dest);
}

if (program.files) {
  fileTypes = removeWhiteSpace(program.files).split(',');
  files = fileTypes.map(function(file){
    return src + '/' + file
  })
}

// if (program.ignore) {
//   ignore = removeWhiteSpace(program.ignore).split(',');
//   console.log(ignore)
// }

init(src, dest);

watch(files, src, dest);
