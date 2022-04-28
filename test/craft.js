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
        'nystudio107/craft-seomatic',
        'spacecatninja/imager-x',
        'mblode/svgplaceholder',
        'topshelfcraft/wordsmith',
        'clubstudioltd/craft-asset-rev',
        'craftcms/aws-s3',
        'putyourlightson/craft-blitz',
        'marionnewlevant/snitch',
        'marionnewlevant/twig-perversion',
        'spatie/craft-ray',
        'topshelfcraft/environment-label',
        'verbb/expanded-singles',
        'craftcms/redactor',
        'sebastianlenz/linkfield',
        'mmikkel/cp-field-inspect',
        'verbb/super-table',
        'nystudio107/craft-emptycoalesce',
        'vaersaagod/matrixmate',
        'nystudio107/craft-autocomplete',
      ],
    };

    before(() => {
      return helpers
        .run(path.join(__dirname, '../generators/craft'))
        .withPrompts(promptAnswers);
    });

    it('installs craft', () => {
      assert.file('craft');
      assert.file('bootstrap.php');
    });

    it('configures craft', () => {
      assert.fileContent('config/general.php', "getenv('PRIMARY_SITE_URL')");
      assert.fileContent('config/db.php', "getenv('DB_SERVER')");
      assert.file('config/project/.gitkeep');
    });

    it('adds empty storage directory', () => {
      assert.file('storage/.gitkeep');
    });

    it('adds templates', () => {
      assert.file('templates/_partials');
      assert.file('templates/_embeds');
      assert.file('templates/index.twig');
    });

    it('adds favicons', () => {
      assert.file('web/favicons/icon.svg');
      assert.file('web/favicon.ico');
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
      assert.file('config/imager-x.php');
    });

    it('configures Blitz plugin', () => {
      assert.file('config/blitz.php');
    });

    it('configures Matrix Mate plugin', () => {
      assert.file('config/matrixmate.php');
    });

    it('configures Redactor plugin', () => {
      assert.file('config/redactor/Simple.json');
      assert.file('config/redactor/Standard.json');
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

    it('configures Gulp correctly', () => {
      assert.fileContent('gulpfile.js', `dist: 'web/dist/'`);
      assert.fileContent('gulpfile.js', `templateSrc: 'templates/'`);
      assert.fileContent('gulpfile.js', `useProxy: true`);
      assert.fileContent('gulpfile.js', `serverBaseDir: './'`);
      assert.fileContent('gulpfile.js', `distCopyPaths: []`);
    });

    it('sets favicon data', () => {
      assert.fileContent('web/favicons/manifest.json', `"name": "Test Project Craft"`);
    });
  });
});
