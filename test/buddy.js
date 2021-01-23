'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-base:buddy', () => {
  describe('default', () => {
    const promptAnswers = {
      projectTitle: 'Test Project',
      projectName: 'test-project',
    };

    before(() => {
      return helpers.run(path.join(__dirname, '../generators/buddy'))
        .withPrompts(promptAnswers);
    });

    it('creates files', () => {
      assert.file([
        'buddy.yml',
      ]);

      assert.fileContent('buddy.yml', `title: "Buddy - ${promptAnswers.projectTitle} Production"`);
      assert.fileContent('buddy.yml', `title: "Buddy - ${promptAnswers.projectTitle} Staging"`);
      assert.fileContent('buddy.yml', `working_directory: "/buddy/${promptAnswers.projectName}"`);
      assert.fileContent('buddy.yml', `target_site_url: "http://${promptAnswers.projectName}-staging.malven.co"`);
      assert.fileContent('buddy.yml', `target_site_url: "https://${promptAnswers.projectName}.com"`);
      assert.fileContent('buddy.yml', `value: "/srv/users/serverpilot/apps/${promptAnswers.projectName}"`);
      assert.fileContent('buddy.yml', `working_directory: "/buddy/${promptAnswers.projectName}"`);

    });
  });
});
