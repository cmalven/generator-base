'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-base:stylelint', () => {
  describe('default', () => {
    before(() => {
      return helpers.run(path.join(__dirname, '../generators/stylelint'))
        .withOptions({
          skipInstall: false,
        });
    });

    it('creates files', () => {
      assert.file([
        '.stylelintrc',
      ]);
    });
  });
});
