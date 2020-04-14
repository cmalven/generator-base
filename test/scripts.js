'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-base:scripts', () => {
  describe('default', () => {
    before(() => {
      return helpers.run(path.join(__dirname, '../generators/scripts'));
    });

    it('creates dir structure', () => {
      assert.file([
        'src/scripts/modules/Transitioner.js',
      ]);
    });

    it('creates main.js', () => {
      assert.file([
        'src/scripts/main.js',
      ]);
    });
  });

  describe('enabling lazysizes', () => {
    before(() => {
      return helpers.run(path.join(__dirname, '../generators/scripts'))
        .withPrompts({
          deps: ['lazysizes'],
        });
    });

    it('adds lazysizes init code', () => {
      assert.fileContent('src/scripts/main.js', "import 'lazysizes'");
      assert.fileContent('src/scripts/main.js', 'new LazyImageTransitioner();');
    });

    it('adds optional modules', () => {
      assert.file([
        'src/scripts/modules/LazyImageTransitioner.js',
      ]);
    });

  });
});
