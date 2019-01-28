const gulp = require('gulp');
const requireDir = require('require-dir');
var FwdRef = require('undertaker-forward-reference');

gulp.registry(new FwdRef());

// Require all tasks in gulp/tasks
requireDir('./gulp/tasks', { recurse: true });

