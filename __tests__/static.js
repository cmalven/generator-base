'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-base:static', () => {
  describe('default', () => {
    const promptAnswers = {
      projectTitle: 'Static Project',
      projectName: 'static-project',
      projectDescription: 'Static project description',
      useTwig: false
    };

    beforeAll(() => {
      return helpers
        .run(path.join(__dirname, '../generators/static'))
        .withPrompts(promptAnswers);
    });

    it('Sets up git', () => {
      assert.file([
        '.gitignore',
        '.git/'
      ]);
    });

    it('adds a README.md', () => {
      assert.fileContent('README.md', `# ${promptAnswers.projectTitle}`);
    });

    it('writes a package.json with project details', () => {
      assert.fileContent('package.json', `"name": "${promptAnswers.projectName}",`);
      assert.fileContent('package.json', `"description": "${promptAnswers.projectDescription}",`);
    });

    it('generates with scripts generator', () => {
      assert.file('src/scripts/');
    });

    it('generates with styles generator', () => {
      assert.file('src/styles/');
    });

    it('creates index.html', () => {
      assert.file('index.html');
    });

    it('configures Gulp correctly', () => {
      assert.file(['gulpfile.js', 'gulp']);
      assert.fileContent('gulp/config.js', `dist: 'dist/'`);
      assert.fileContent('gulp/config.js', `templateSrc: './'`);
      assert.fileContent('gulp/config.js', `useProxy: false`);
      assert.fileContent('gulp/config.js', `serverBaseDir: './'`);
    });
  });
});
