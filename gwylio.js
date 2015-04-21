var gwylio    = {};
var fs        = require('fs-extra');
var gaze      = require('gaze');
var path      = require('path');
var log       = console.log.bind(console);
var chalk     = require('chalk');


gwylio.copy = function(filepath, dirSrc, dirDest) {
      var diff = filepath.substring(path.resolve(dirSrc).length),
          resolvedFilepath = path.resolve(dirDest + diff);
          dest = path.dirname(resolvedFilepath);

      log(chalk.blue('⊂(ↁ_ↁ)つ copying', filepath, filepath, ' to ', resolvedFilepath, '...'));

      fs.copy(filepath, resolvedFilepath, function(err) {
        if (err) return console.error(err)
        log(chalk.green.bold('✓ Success '));

      });
}

gwylio.init = function(dirSrc, dirDest) {
  log(chalk.blue('⊂(ↁ_ↁ)つ Gwylio is starting... '))
  log(chalk.blue('Copying all files... '))
  // copy everything
  fs.copy(dirSrc, dirDest, function(err) {
    if (err) return console.error(chalk.red(err))
    log(chalk.green.bold("✓ Done!"));
  });
}

gwylio.watch = function(srcFiles, dirSrc, dirDest) {
  gaze(srcFiles, function() {
    var relFiles = JSON.stringify(this.relative());
    log(chalk.blue('⊂(ↁ_ↁ)つ Gwylio is watching: '));
    log(chalk.grey(relFiles));
    this.on('changed', function(filepath) {
      log(chalk.blue('⊂(ↁoↁ)つ ', filepath, ' changed!'));
      gwylio.copy(filepath, dirSrc, dirDest);
    });
  });
}

module.exports = gwylio;
