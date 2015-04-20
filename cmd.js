var gwylio = require('./gwylio');
var init = gwylio.init;
var watch = gwylio.watch;
var program = require('commander');

program
  .version('0.0.1')
  .option('-s, --src [dir or glob]', 'The source folder (my/src)')
  .option('-d, --dest [dir]', 'The top level dir to copy to (my/dest) (folder structure will be copied too)')
  .option('-f, --files [list]', 'Comma seperated list of files watch (this.js,*.txt,**/*.md)')
  //.option('-i, --ignore [list]', 'Comma seperated list of file types to ignore (html). This takes presidence over the watch list')
  .parse(process.argv);

if (!program.src || !program.files) return console.error('D\'oh! Tell me what to watch dummy');
if (!program.dest) return console.error('D\'oh! Tell me where to copy changes to');

var src,
    dest,
    files,
    ignore,
    reWS = / /g;

function removeWhiteSpace(str) {
  return str.replace(reWS, '');
}

if (program.src) {
  src = removeWhiteSpace(program.src);
  console.log(src)
}

if (program.dest) {
  dest = removeWhiteSpace(program.dest);
  console.log(dest)
}

if (program.files) {
  files = removeWhiteSpace(program.files).split(',');
  console.log(files)
}

// if (program.ignore) {
//   ignore = removeWhiteSpace(program.ignore).split(',');
//   console.log(ignore)
// }

init(src, dest);

watch(files, src, dest);
