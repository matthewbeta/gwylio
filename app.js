var fs        = require('fs-extra');
var gaze      = require('gaze');
var path      = require('path');

var dirSrc    = 'src';
var dirDest   = 'test';
var log = console.log.bind(console);

function gwylioCopy(filepath) {

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

// copy everything
fs.copy(dirSrc, dirDest, function(err) {
  if (err) return console.error(err)
  console.log("copied everything!")
}) //copies file)


gaze(['src/**/*.js', 'src/**/*.txt'], function() {

  console.log('Now watching: ', this.relative())

  this.on('changed', function(filepath) {
    gwylioCopy(filepath);
  });

  this.on('added', function(filepath) {
    console.log(filepath + ' was added');
    gwylioCopy(filepath);
  });

  this.on('deleted', function(filepath) {
    console.log(filepath + ' was deleted');
    gwylioRemove(filepath);
  });

});
