'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const del = require('del');
const childProcess = require('child_process');
const yosay = require('yosay');
const prompts = require('./modules/prompts');
const plugins = require('./modules/available-plugins');
const fs = require('fs');
const extend = require('lodash/extend');
const guid = require('guid');
const path = require('path');
const mkdirp = require('mkdirp');

module.exports = class extends Generator {
  initializing() {
    this.closingStatements = [];
    this.props = {
      craftPlugins: [],
    };

    try {
      childProcess.execSync('composer --version --quiet');
    } catch (e) {
      this.log(chalk.red('Composer is not installed. You must install it to use this generator. See https://getcomposer.org/download/.'));
      process.exit(1);
    }
  }

  prompting() {
    this.log(yosay(
      'Welcome to the impressive ' + chalk.red('Craft') + ' generator!'
    ));

    console.log(chalk.yellow('Craft Config'));

    return this.prompt(prompts).then(props => {
      this.props = extend(props, {
        authorName: 'Malven Co.',
        authorEmail: 'chris@malven.co',
        authorUrl: 'https://malven.co',
        githubName: 'cmalven',

        // Generates a random security key to be used in .env
        securityKey: guid.raw(),
      });

      // To access props use this.props.someAnswer;
    });
  }

  default() {
    if (path.basename(this.destinationPath()) !== this.props.projectName) {
      const text = `\nYour project should be inside a folder named ${chalk.red(this.props.projectName)}\nI'll automatically create this folder.\n\n(If you meant to run this generator inside of an existing project directory, make sure that the ${chalk.red('Project Name')} you enter at the prompt matches the name of your current directory.)\n`;
      this.log(chalk.yellow(text));
      mkdirp(this.props.projectName);
      this.destinationRoot(this.destinationPath(this.props.projectName));
    }
  }

  git() {
    this.composeWith(require.resolve('../git'));
  }

  styles() {
    this.composeWith(require.resolve('../styles'));
  }

  scripts() {
    this.composeWith(require.resolve('../scripts'));
  }

  husky() {
    this.composeWith(require.resolve('../husky'));
  }

  buddy() {
    if (this.props.useBuddy) {
      this.composeWith(require.resolve('../buddy'), {
        projectTitle: this.props.projectTitle,
        projectName: this.props.projectName,
      });
    }
  }

  build() {
    // Currently only supports gulp for building
    this.composeWith(require.resolve('../gulp'), {
      publicDistPath: '/dist/',
      rootDistPath: 'web/dist',
      templateSrc: 'templates/',
      templateDist: 'templates/',
      distCopyPath: null,
      useProxy: true,
      serverBaseDir: './',
      useTwig: false,
    });
  }

  writing() {
    // download craft
    childProcess.execSync(`composer create-project craftcms/craft ${this.props.projectName}-craft --quiet`);

    // move install to this dir since composer requires installing to a sub directory
    childProcess.execSync(`mv ${this.props.projectName}-craft/* ${this.destinationRoot()}`);
    del.sync([
      this.destinationPath(`${this.props.projectName}-craft`),
    ]);

    // Clean the default Craft install
    del.sync([
      this.destinationPath('LICENSE.md'),
      this.destinationPath('README.md'),
      this.destinationPath('craft.bat'),
      this.destinationPath('web/.htaccess'),
      this.destinationPath('.env'),
      this.destinationPath('.env.example'),
      this.destinationPath('config/general.php'),
      this.destinationPath('config/redactor'),
      this.destinationPath('config/db.php'),
      this.destinationPath('composer.json'),
      this.destinationPath('composer.lock'),
      this.destinationPath('package.json'),
      this.destinationPath('templates'),
    ]);

    // If using SEOmatic, remove default robots.txt
    if (this.props.craftPlugins.includes('seomatic') > -1) {
      del.sync([
        this.destinationPath('web/robots.txt'),
      ]);
      this.closingStatements.push('robots.txt: ' + chalk.yellow('We removed the default robots.txt because you’re using SEOmatic. Be sure to add your custom robots.txt to the SEOmatic settings in Craft.'));
    }

    this.fs.copyTpl(
      this.templatePath('web/htaccess'),
      this.destinationPath('web/.htaccess'),
      this.props
    );

    this.fs.copyTpl(
      this.templatePath('web/favicons'),
      this.destinationPath('web/favicons'),
      this.props
    );

    this.fs.copyTpl(
      this.templatePath('env.sample'),
      this.destinationPath('env.sample'),
      this.props
    );

    this.fs.copyTpl(
      this.templatePath('env.sample'),
      this.destinationPath('.env'),
      this.props
    );

    this.fs.copy(
      this.templatePath('config/general.php'),
      this.destinationPath('config/general.php')
    );

    this.fs.copy(
      this.templatePath('config/db.php'),
      this.destinationPath('config/db.php')
    );

    this.fs.copy(
      this.templatePath('FauxTwigExtension.php'),
      this.destinationPath('FauxTwigExtension.php')
    );

    this.fs.copy(
      this.templatePath('config/project/.gitkeep'),
      this.destinationPath('config/project/.gitkeep')
    );

    this.fs.copy(
      this.templatePath('storage/.gitkeep'),
      this.destinationPath('storage/.gitkeep')
    );

    // Craft Templates
    this.fs.copyTpl(
      this.templatePath('templates/'),
      this.destinationPath('templates/'),
      this.props
    );

    // Asset Rev
    if (this.props.craftPlugins.includes('clubstudioltd/craft-asset-rev')) {
      this.fs.copy(
        this.templatePath('config/assetrev.php'),
        this.destinationPath('config/assetrev.php')
      );
    }

    // SEOmatic
    if (this.props.craftPlugins.includes('nystudio107/craft-seomatic')) {
      this.fs.copy(
        this.templatePath('config/seomatic.php'),
        this.destinationPath('config/seomatic.php')
      );
    }

    // Blitz
    if (this.props.craftPlugins.includes('putyourlightson/craft-blitz')) {
      this.fs.copy(
        this.templatePath('config/blitz.php'),
        this.destinationPath('config/blitz.php')
      );
    }

    // Matrix Mate
    if (this.props.craftPlugins.includes('vaersaagod/matrixmate')) {
      this.fs.copy(
        this.templatePath('config/matrixmate.php'),
        this.destinationPath('config/matrixmate.php')
      );
    }

    // Imager
    if (this.props.craftPlugins.includes('spacecatninja/imager-x')) {
      this.fs.copyTpl(
        this.templatePath('config/imager-x.php'),
        this.destinationPath('config/imager-x.php'),
        this.props
      );
    }

    // Environment Label
    if (this.props.craftPlugins.includes('topshelfcraft/environment-label')) {
      this.fs.copy(
        this.templatePath('config/environment-label.php'),
        this.destinationPath('config/environment-label.php')
      );
    }

    // Redactor
    if (this.props.craftPlugins.includes('craftcms/redactor')) {
      this.fs.copy(
        this.templatePath('config/redactor'),
        this.destinationPath('config/redactor')
      );
    }

    // Git
    if (this.fs.exists('.gitignore')) {
      this.fs.append(
        this.destinationPath('.gitignore'),
        fs.readFileSync(this.templatePath('gitignore'))
      );
    } else {
      this.fs.copy(
        this.templatePath('gitignore'),
        this.destinationPath('.gitignore')
      );
    }

    // Package
    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath('package.json'),
      this.props
    );

    // README
    this.fs.copyTpl(
      this.templatePath('README.md'),
      this.destinationPath('README.md'),
      this.props
    );

    // Editor
    this.fs.copy(
      this.templatePath('.editorconfig'),
      this.destinationPath('.editorconfig')
    );

    // Composer
    this.fs.copyTpl(
      this.templatePath('composer.json'),
      this.destinationPath('composer.json')
    );
  }

  install() {
    const pluginList = this.props.craftPlugins.concat([
      'squizlabs/php_codesniffer',
    ]).join(' ');
    childProcess.execSync(`composer require --no-progress ${pluginList} --quiet`);
  }

  end() {
    this.log('\n\n\n');
    this.log(chalk.green('==============================='));
    this.log(chalk.green('====== Install Notes =========='));
    this.log(chalk.green('==============================='));

    this.closingStatements.push(chalk.green('Finishing Craft Setup'));

    this.closingStatements.push('Directory: ' + chalk.yellow(`If you’re not in ${chalk.cyan(this.props.projectName)} already, run ${chalk.cyan('cd ' + this.props.projectName)}`));

    this.closingStatements.push('Database: ' + chalk.yellow(`Create a MySQL database named ${chalk.cyan(this.props.projectName)} if you haven’t already.`));

    this.closingStatements.push('You may be able to create a database from the command line with:\n' + chalk.cyan(`echo 'CREATE DATABASE \`${this.props.projectName}\`' | mysql -u root -p`));

    this.closingStatements.push('Install Craft: ' + chalk.yellow(`Finish your Craft installation by visiting ` + chalk.cyan(`/admin`) + ' or by running ' + chalk.cyan(`./craft install/craft`)));

    this.closingStatements.push('Craft Plugins: ' + chalk.yellow('Your chosen plugins have been installed via Composer, but you’ll still need to install them in the Craft control panel at ' + chalk.cyan(`/admin/settings/plugins`) + ' after you install Craft, or via the command line using the command below:'));
    this.closingStatements.push(chalk.cyan(this.props.craftPlugins.map(plugin => {
      return `./craft plugin/install ` + plugins.find(obj => obj.src === plugin).handle;
    }).join(' && ')));

    const that = this;
    // Output all closing statements
    this.closingStatements.forEach(function(statement) {
      that.log('\n' + statement);
    });

    this.log('\n\n\n');
  }
};
