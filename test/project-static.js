'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-base:project-static', () => {
  describe('default', () => {
    const promptAnswers = {
      projectTitle: 'Static Project',
      projectName: 'static-project',
      projectDescription: 'Static project description',
    };

    before(() => {
      return helpers
        .run(path.join(__dirname, '../generators/project-static'))
        .withPrompts(promptAnswers);
    });

    it('Sets up git', () => {
      assert.file([
        '.gitignore',
        '.git/',
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

    it('creates Twig templates', () => {
      assert.file('src/templates/index.twig');
      assert.file('src/templates/_layout.twig');
      assert.fileContent('src/templates/_partials/head.twig', `siteName: 'Static Project'`);
      assert.fileContent('src/templates/_partials/head.twig', `title: 'Static Project'`);
      assert.fileContent('src/templates/_partials/head.twig', `description: 'Static project description'`);
      assert.fileContent('src/templates/_partials/head.twig', `url: 'https://static-project.com'`);
    });

    it('sets favicon data', () => {
      assert.fileContent('src/templates/web/favicons/manifest.json', `"name": "Static Project"`);
    });

    it('configures Gulp correctly', () => {
      assert.file('gulpfile.js');
      assert.fileContent('gulpfile.js', `dist: 'dist/'`);
      assert.fileContent('gulpfile.js', `styleSrc: 'src/styles/'`);
      assert.fileContent('gulpfile.js', `styleDist: 'dist/styles/'`);
      assert.fileContent('gulpfile.js', `scriptSrc: 'src/scripts/'`);
      assert.fileContent('gulpfile.js', `scriptDist: 'dist/scripts/'`);
      assert.fileContent('gulpfile.js', `scriptPublic: '/scripts/'`);
      assert.fileContent('gulpfile.js', `templateSrc: 'src/templates/'`);
      assert.fileContent('gulpfile.js', `templateDist: 'dist/'`);
      assert.fileContent('gulpfile.js', `imageSrc: 'src/images/'`);
      assert.fileContent('gulpfile.js', `imageDist: 'dist/images/'`);
      assert.fileContent('gulpfile.js', `serverBaseDir: 'dist/'`);
      assert.fileContent('gulpfile.js', `distCopyPaths: [
      'src/templates/web/',
    ],`);
    });
  });
});
