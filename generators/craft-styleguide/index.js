'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  initializing() {

  }

  prompting() {
    this.log(yosay(
      'Welcome to the impressive ' + chalk.red('Craft styleguide') + ' generator!'
    ));
  }

  writing() {
    // Templates
    this.fs.copy(
      this.templatePath('templates/styleguide'),
      this.destinationPath('templates/styleguide')
    );

    // Styles
    this.fs.copy(
      this.templatePath('src/styles/styleguide'),
      this.destinationPath('src/styles/styleguide')
    );
  }

  end() {
    this.log(chalk.green('Finished adding the Craft styleguide!'));

    this.log('You’ll probably need to add ' + chalk.yellow(`@import 'styleguide/*';`) + ' to the bottom of your ' + chalk.cyan('main.scss'));
  }
};
