'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-base:build', () => {
  describe('default', () => {
    before(() => {
      return helpers.run(path.join(__dirname, '../generators/build'))
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
        '.browserslistrc',
        '.eslintrc',
        '.stylelintrc',
        '.swcrc',
        'gulpfile.js',
        'src/images',
        'src/images/svg/icon/README.md',
        'src/images/svg/full/README.md',
        'src/images/svg/inline/README.md',
      ]);
    });

    it('doesn\'t create index.html', () => {
      assert.noFile('src/templates/index.twig');
    });

    it('adds .gitgnore rules', () => {
      assert.fileContent('.gitignore', '/dist');
    });

    it("doesn't enable twig in config", () => {
      assert.noFileContent('gulpfile.js', `twig: {`);
      assert.noFileContent('gulpfile.js', `enable: true`);
    });

    it('sets valid random browsersync port', () => {
      assert.fileContent('gulpfile.js', /port: 3\d\d\d,/);
    });
  });

  describe('with twig enabled', () => {
    before(() => {
      return helpers.run(path.join(__dirname, '../generators/build'))
        .withOptions({
          skipInstall: true,
          publicDistPath: '',
          rootDistPath: 'dist',
          templateSrc: 'src/templates/',
          templateDist: 'dist/',
          distCopyPath: null,
          serverBaseDir: 'dist/',
          useProxy: false,
          useTwig: true,
        });
    });

    it('enables twig in config', () => {
      assert.fileContent('gulpfile.js', `twig: {`);
      assert.fileContent('gulpfile.js', `enable: true`);
      assert.fileContent('gulpfile.js', `twig: {
    enable: true,
  },`);
    });
  });
});
