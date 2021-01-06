'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-base:styles', () => {
  describe('default', () => {
    before(() => {
      return helpers.run(path.join(__dirname, '../generators/styles'))
        .withPrompts({
          deps: [],
        });
    });

    it('creates files', () => {
      assert.file([
        'src/styles/main.scss',
        'src/styles/base',
        'src/styles/util',
      ]);
    });

    it('adds default objects and layout', () => {
      assert.file('src/styles/objects');
      assert.file('src/styles/layout');
    });
  });

  describe('Sass MQ option', () => {
    before(() => {
      return helpers.run(path.join(__dirname, '../generators/styles'))
        .withPrompts({
          deps: ['sass-mq'],
        });
    });

    it('adds Sass MQ', () => {
      assert.fileContent('src/styles/main.scss', 'sass-mq/');
      assert.fileContent('src/styles/base/_variables.scss', '// Media Queries');
    });
  });

  describe('Sass Toolkit option', () => {
    before(() => {
      return helpers.run(path.join(__dirname, '../generators/styles'))
        .withPrompts({
          deps: ['@malven/sass-toolkit'],
        });
    });

    it('adds sass-toolkit', () => {
      assert.fileContent('src/styles/main.scss', '@malven/sass-toolkit/');
      assert.fileContent('src/styles/base/_variables.scss', '// Colors');
      assert.fileContent('src/styles/base/_variables.scss', '// Spacing');
      assert.fileContent('src/styles/base/_variables.scss', '// Type – Font Stacks');
      assert.fileContent('src/styles/base/_variables.scss', '// Type – Styles');
    });
  });

  describe('Without default objects and layout', () => {
    before(() => {
      return helpers.run(path.join(__dirname, '../generators/styles'))
        .withPrompts({
          includeObjectsLayouts: false,
        });
    });

    it('does not add default objects and layout', () => {
      assert.noFile('src/styles/objects');
      assert.noFile('src/styles/layout');
    });
  });
});
