#!/usr/bin/env node

var fs        = require('fs-sync');
var chokidar  = require('chokidar');
var path      = require('path');
var program   = require('commander');

var pkg       = require(path.join(__dirname, 'package.json'))

var dirSrc    = process.cwd;
var dirDest;

program.version(pkg.version)
  .option('-d, --dest', 'Destination directory')
  .parse(process.argv);

if(!program.args.length) {
    program.help();
}

if (program.dest) {
  dirDest = program.dest;
} else {
  throw new Error('PLease specify a directory (eg: gwylio -d "mydir/test")');
}

var watcher   = chokidar.watch(dirSrc, {
  ignored: /[\/\\]\./, persistent: true
});

var log = console.log.bind(console);

function gwylioCopy(filePath) {
  var srcPath = path.normalize(filePath),
      commonPath = path.normalize(srcPath).split(path.sep),
      destPath;

  commonPath.splice(0, 1);

  commonPath = commonPath.join([seperator = path.sep]);

  destPath = path.resolve(dirDest + path.sep + commonPath);

  fs.copy(srcPath, destPath, { force: true })
}

function gwylioRemove(filePath) {
  var srcPath = path.normalize(filePath),
      commonPath = path.normalize(srcPath).split(path.sep),
      destPath;

  commonPath.splice(0, 1);

  commonPath = commonPath.join([seperator = path.sep]);

  destPath = path.resolve(dirDest + path.sep + commonPath);

  fs.remove(destPath)
}


watcher
.on('ready', function() {
  fs.copy(dirSrc, dirDest, {force: true})
  log('watching', dirSrc);
})
.on('change', function(filePath) {
  gwylioCopy(filePath);
  log('File', path.basename(filePath), 'has been changed');
  log('watching', dirSrc);
})
.on('add', function(filePath) {
  gwylioCopy(filePath);
  log('File', path.basename(filePath), 'has been added');
  log('watching', dirSrc);
})
.on('addDir', function(filePath) {
  gwylioCopy(filePath);
  log('Directory', path.basename(filePath), 'has been added');
  log('watching', dirSrc);
})
.on('unlink', function(filePath) {
  gwylioRemove(filePath);
  log('File', path.basename(filePath), 'has been removed');
  log('watching', dirSrc);
})
.on('unlinkDir', function(filePath) {
  gwylioRemove(filePath);
  log('Directory', path.basename(filePath), 'has been removed');
  log('watching', dirSrc);
})
.on('error', function(error) {
  log('Error happened', error);
})
