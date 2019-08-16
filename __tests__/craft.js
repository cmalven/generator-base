'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-base:craft', () => {
  describe('default', () => {
    const promptAnswers = {
      projectTitle: 'Test Project Craft',
      projectName: 'test-craft',
      projectDescription: 'Craft production description',
      craftPlugins: [
        'clubstudioltd/craft-asset-rev',
        'topshelfcraft/environment-label',
        'aelvan/imager',
        'putyourlightson/craft-blitz',
        'nystudio107/craft-seomatic'
      ]
    };

    beforeAll(() => {
      return helpers
        .run(path.join(__dirname, '../generators/craft'))
        .withPrompts(promptAnswers);
    });

    it('configures craft', () => {
      assert.fileContent('config/general.php', "getenv('SITE_URL')");
      assert.fileContent('config/db.php', "getenv('DB_SERVER')");
    });

    it('installs plugins with composer', () => {
      assert.fileContent('composer.json', `"${promptAnswers.craftPlugins[0]}":`);
    });

    it('configures assetrev plugin', () => {
      assert.file('config/assetrev.php');
    });

    it('configures environment label plugin', () => {
      assert.file('config/environment-label.php');
    });

    it('configures SEOmatic plugin', () => {
      assert.file('config/seomatic.php');
    });

    it('configures Imager plugin', () => {
      assert.file('config/imager.php');
    });

    it('configures Blitz plugin', () => {
      assert.file('config/blitz.php');
    });

    it('adds .gitignore', () => {
      assert.fileContent('.gitignore', '# Craft');
    });

    it('adds a README.md', () => {
      assert.fileContent('README.md', `# ${promptAnswers.projectTitle}`);
    });

    it('writes a package.json with project details', () => {
      assert.fileContent('package.json', `"name": "${promptAnswers.projectName}",`);
      assert.fileContent('package.json', `"description": "${promptAnswers.projectDescription}",`);
    });
  });
});
