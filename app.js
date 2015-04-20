var gwylio = require('./gwylio.js');
var init = gwylio.init;
var watch = gwylio.watch;

var src    = 'src';
var dest   = 'test';
var files  = ['src/**/*.js', 'src/**/*.txt'];

init(src, dest);

watch(files, src, dest);
