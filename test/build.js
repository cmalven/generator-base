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
          dist: 'dist',
          templateSrc: 'src/templates/',
          templateDist: 'dist/',
          imageSrc: 'src/images/',
          imageDist: 'src/static/images/',
        });
    });

    it('creates files', () => {
      assert.file([
        '.browserslistrc',
        '.eslintrc',
        '.nvmrc',
        '.stylelintrc',
        'gulpfile.js',
        'src/images',
        'src/images/svg/full/README.md',
        'src/images/svg/icon/README.md',
        'src/images/svg/inline/README.md',
        'vite.config.js',
      ]);
    });

    it('doesn\'t create index.html', () => {
      assert.noFile('src/templates/index.twig');
    });

    it('adds .gitgnore rules', () => {
      assert.fileContent('.gitignore', '/dist');
    });
  });
});
