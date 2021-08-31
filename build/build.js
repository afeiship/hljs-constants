(function () {
  'use strict';

  const gulp = require('gulp');
  const globby = require('globby');
  const fs = require('fs');
  const $ = require('gulp-load-plugins')({
    pattern: ['gulp-*', 'gulp.*', 'del', '@jswork/gulp-*']
  });

  const strip = (x) => x.substr(0, x.lastIndexOf('.'));

  const buildConstant = (role, pattern, dir) => {
    const files = globby.sync(pattern, { cwd: `node_modules/highlight.js${dir}` }).map(strip);
    console.log(files);
    const list = JSON.stringify(files, null, 2);
    fs.writeFileSync(`./src/${role}.ts`, `export const ${role} = ${list}`);
  };

  gulp.task('build:styles', function () {
    buildConstant('styles', '**/*.css', '/styles');
    return gulp.src('.', { allowEmpty: true });
  });

  gulp.task('build:languages', function () {
    buildConstant('languages', '**/*.js', '/lib/languages');
    return gulp.src('.', { allowEmpty: true });
  });

  gulp.task('build', gulp.series(['build:styles', 'build:styles']));
})();
