'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-base:husky', () => {
  it('configures both JS and SCSS', () => {
    return helpers
      .run(path.join(__dirname, '../generators/husky'))
      .then(() => {
        assert.fileContent('package.json', 'husky');
        assert.fileContent('package.json', 'lint-staged');

        const config = `
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged",
      "pre-push": "npm test"
    }
  },
  "lint-staged": {
    "*.js": "npm run lint-scripts",
    "*.scss": "npm run lint-styles"
  }
`;
        assert.fileContent('package.json', config);
      });
  });

  it('configures only JS', () => {
    return helpers
      .run(path.join(__dirname, '../generators/husky'))
      .withPrompts({
        lint: ['js']
      })
      .then(() => {
        const config = `
  "lint-staged": {
    "*.js": "npm run lint-scripts"
  }
`;
        assert.fileContent('package.json', config);
      });
  });
  it('configures only SCSS', () => {
    return helpers
      .run(path.join(__dirname, '../generators/husky'))
      .withPrompts({
        lint: ['scss']
      })
      .then(() => {
        const config = `
  "lint-staged": {
    "*.scss": "npm run lint-styles"
  }
`;
        assert.fileContent('package.json', config);
      });
  });
});
