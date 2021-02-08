'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-base:gulp', () => {
  describe('default', () => {
    before(() => {
      return helpers.run(path.join(__dirname, '../generators/gulp'))
        .withOptions({
          skipInstall: true,
          publicDistPath: '/',
          rootDistPath: 'dist',
          templateSrc: 'src/templates/',
          templateDist: 'dist/',
          distCopyPath: 'web/',
          serverBaseDir: 'dist/',
          useProxy: false,
          useTwig: false,
        });
    });

    it('creates files', () => {
      assert.file([
        'gulpfile.js',
        '.stylelintrc',
        'gulp/tasks',
        'src/images',
        'gulp/tasks/base.js',
        'gulp/tasks/build.js',
      ]);
    });

    it('doesn\'t create index.html', () => {
      assert.noFile('src/templates/index.twig');
    });

    it('adds .gitgnore rules', () => {
      assert.fileContent('.gitignore', '/dist');
    });

    it("doesn't create twig build files", () => {
      assert.noFile([
        'gulp/tasks/twig.js',
      ]);
      assert.noFileContent('gulp/tasks/base.js', "'twig',");
      assert.noFileContent('gulp/tasks/watch.js', "runSequence('twig'");
      assert.fileContent('gulp/tasks/watch.js', `gulp.series('templates')`);
    });

    it('sets valid random browsersync port', () => {
      assert.fileContent('gulp/tasks/browsersync.js', /port: 3\d\d\d,/);
    });
  });

  describe('with twig enabled', () => {
    before(() => {
      return helpers.run(path.join(__dirname, '../generators/gulp'))
        .withOptions({
          skipInstall: true,
          publicDistPath: '',
          rootDistPath: 'dist',
          templateSrc: 'src/templates/',
          templateDist: 'dist/',
          distCopyPath: 'src/templates/web/',
          serverBaseDir: 'dist/',
          useProxy: false,
          useTwig: true,
        });
    });

    it('creates twig build files', () => {
      assert.file([
        'gulp/tasks/twig.js',
      ]);
      assert.fileContent('gulp/tasks/base.js', `'twig',`);
      assert.fileContent('gulp/tasks/watch.js', `gulp.series('twig'))`);
    });
  });
});
