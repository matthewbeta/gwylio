var gwylio    = {};
var fs        = require('fs-extra');
var gaze      = require('gaze');
var path      = require('path');
var log       = console.log.bind(console);

gwylio.copy = function(filepath, dirSrc, dirDest) {
      console.log(filepath, dirSrc, dirDest)
      var diff = filepath.substring(path.resolve(dirSrc).length),
          resolvedFilepath = path.resolve(dirDest + diff);
          dest = path.dirname(resolvedFilepath);

      log('filepath: ' + filepath);
      log('resolved filepath: ' + resolvedFilepath);

      fs.copy(filepath, resolvedFilepath, function(err) {
        if (err) return console.error(err)
        log("success!")
      });
}

gwylio.init = function(dirSrc, dirDest) {
  debugger

  // copy everything
  fs.copy(dirSrc, dirDest, function(err) {
    if (err) return console.error(err)
    log("copied everything!")
  });
}

gwylio.watch = function(srcFiles, dirSrc, dirDest) {
  gaze(srcFiles, function() {
    console.log('Now watching: ', this.relative())
    this.on('changed', function(filepath) {
      gwylio.copy(filepath, dirSrc, dirDest);
    });
  });
}

module.exports = gwylio;
