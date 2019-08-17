'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-base:husky', () => {
  describe('default', () => {
    const promptAnswers = {
      projectTitle: 'Husky Project',
      projectName: 'husky-project',
      projectDescription: 'Husky project description',
      useNunjucks: false
    };

    beforeAll(() => {
      return helpers
        .run(path.join(__dirname, '../generators/static'))
        .withPrompts(promptAnswers);
    });

    it('adds dependencies', () => {
      assert.fileContent('package.json', 'husky');
      assert.fileContent('package.json', 'lint-staged');
    });

    it('configures husky and lint-staged', () => {
      const config = `
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged",
      "pre-push": "yarn test"
    }
  },
  "lint-staged": {
    "*.js": [
      "yarn lint-scripts",
      "git add"
    ],
    "*.scss": [
      "yarn lint-styles"
    ]
  }
`;
      assert.fileContent('package.json', config);
    });
  });
});
