'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-base:eslint', () => {
  describe('default', () => {
    before(() => {
      return helpers.run(path.join(__dirname, '../generators/eslint'))
        .withOptions({
          skipInstall: false,
        });
    });

    it('creates files', () => {
      assert.file([
        '.eslintrc',
      ]);
    });
  });
});
