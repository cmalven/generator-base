'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-base:scripts', () => {
  describe('default', () => {
    before(() => {
      return helpers.run(path.join(__dirname, '../generators/scripts'));
    });

    it('creates main.ts', () => {
      assert.file([
        'src/scripts/main.ts',
      ]);
    });

    it('Adds typescript config', () => {
      assert.file('tsconfig.json');
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
      assert.fileContent('src/scripts/main.ts', "import 'lazysizes'");
      assert.file('src/scripts/utils/LazyImageTransitioner.ts');
      assert.fileContent('src/scripts/main.ts', "import LazyImageTransitioner from './utils/LazyImageTransitioner'");
      assert.fileContent('src/scripts/main.ts', 'new LazyImageTransitioner();');
    });
  });

  describe('enabling smooth-scroll', () => {
    before(() => {
      return helpers.run(path.join(__dirname, '../generators/scripts'))
        .withPrompts({
          deps: ['smooth-scroll'],
        });
    });

    it('adds smooth-scroll init code', () => {
      assert.fileContent('src/scripts/main.ts', "import SmoothScroll from 'smooth-scroll'");
    });
  });

  describe('enabling object-fit-videos', () => {
    before(() => {
      return helpers.run(path.join(__dirname, '../generators/scripts'))
        .withPrompts({
          deps: ['object-fit-videos'],
        });
    });

    it('adds object-fit-videos init code', () => {
      assert.fileContent('src/scripts/main.ts', "import objectFitVideos from 'object-fit-videos'");
    });

    it('adds object-fit-videos typescript definition', () => {
      assert.file('src/scripts/types/object-fit-videos.d.ts');
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
      assert.fileContent('src/scripts/main.ts', "import { App } from '@malven/modu';");
      assert.fileContent('src/scripts/main.ts', 'const app = new App({');
      assert.fileContent('src/scripts/main.ts', 'app.init();');
    });

    it('adds optional modules', () => {
      assert.file([
        'src/scripts/modules/Reveal.ts',
      ]);
    });
  });
});
