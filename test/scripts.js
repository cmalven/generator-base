'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-base:scripts', () => {
  describe('default', () => {
    before(() => {
      return helpers.run(path.join(__dirname, '../generators/scripts'));
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
    });
  });

  describe('enabling modu', () => {
    before(() => {
      return helpers.run(path.join(__dirname, '../generators/scripts'))
        .withPrompts({
          deps: ['@malven/modu'],
        });
    });

    it('adds modu init code', () => {
      assert.fileContent('src/scripts/main.js', "import { App } from '@malven/modu';");
      assert.fileContent('src/scripts/main.js', 'const app = new App({');
      assert.fileContent('src/scripts/main.js', 'app.init();');
    });

    it('adds optional modules', () => {
      assert.file([
        'src/scripts/modules/Reveal.js',
      ]);
    });
  });
});
