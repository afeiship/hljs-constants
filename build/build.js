(function () {
  'use strict';

  const gulp = require('gulp');
  const globby = require('globby');
  const fs = require('fs');
  const stripExtname = require('@jswork/strip-extname').default;
  const $ = require('gulp-load-plugins')({
    pattern: ['gulp-*', 'gulp.*', 'del', '@jswork/gulp-*']
  });

  const strip = (item) => stripExtname(item, true);

  const buildConstant = (role, pattern, dir) => {
    const files = globby.sync(pattern, { cwd: `node_modules/highlight.js${dir}` }).map(strip);
    const list = JSON.stringify(files, null, 2);
    fs.writeFileSync(`./src/constants.ts`, `export const ${role} = ${list}; \n\n`, { flag: 'a+' });
  };

  gulp.task('build:prepare', function () {
    fs.writeFileSync('./src/constants.ts', '');
    return gulp.src('.', { allowEmpty: true });
  });

  gulp.task('build:styles', function () {
    buildConstant('styles', '**/*.css', '/styles');
    return gulp.src('.', { allowEmpty: true });
  });

  gulp.task('build:languages', function () {
    buildConstant('languages', '**/*.js.js', '/lib/languages');
    return gulp.src('.', { allowEmpty: true });
  });

  gulp.task('build', gulp.series(['build:prepare', 'build:styles', 'build:languages']));
})();
