var fs        = require('fs-extra');
var gaze      = require('gaze');
var path      = require('path');

var dirSrc    = 'src';
var dirDest   = 'test';
var srcFiles  = ['src/**/*.js', 'src/**/*.txt'];

var log = console.log.bind(console);

var gwylio = {};

gwylio.copy = function(filepath) {

      var diff = filepath.substring(path.resolve(dirSrc).length),
          resolvedFilepath = path.resolve(dirDest + diff);
          dest = path.dirname(resolvedFilepath);

      log('filepath: ' + filepath);
      log('resolved filepath: ' + resolvedFilepath);

      fs.copy(filepath, resolvedFilepath, function(err) {
        if (err) return console.error(err)
        console.log("success!")
      }) //copies file

}

gwylio.init = function() {
  // copy everything
  fs.copy(dirSrc, dirDest, function(err) {
    if (err) return console.error(err)
    console.log("copied everything!")
  }) //copies file)
}


gaze(srcFiles, function() {

  console.log('Now watching: ', this.relative())

  this.on('changed', function(filepath) {
    gwylio.copy(filepath);
  });

});

module.exports = gwylio;
