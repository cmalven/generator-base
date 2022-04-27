'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-base:git', () => {
  describe('default', () => {
    before(() => {
      return helpers.run(path.join(__dirname, '../generators/git'));
    });

    it('creates files', () => {
      assert.file([
        '.git',
        '.gitignore',
      ]);

      assert.noFile([
        '.github/workflows/main.yml',
      ]);
    });
  });

  describe('with github actions', () => {
    before(() => {
      return helpers.run(path.join(__dirname, '../generators/git'))
        .withOptions({
          addGithubActionWorkflows: true,
        });
    });

    it('adds Github action workflows', () => {
      assert.file([
        '.github/workflows/main.yml',
      ]);
    });
  });

});
