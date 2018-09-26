'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');

module.exports = class extends Generator {
  writing() {
    this.log(chalk.green('Writing eslint files...'));

    this.fs.copy(
      this.templatePath('.eslintrc'),
      this.destinationPath('.eslintrc')
    );
  }

  install() {
    const devDependencies = [
      'eslint',
      '@malven/eslint-config',
      'eslint-plugin-react', // dependency of @malven/eslint-config
      'babel-eslint' // dependency of @malven/eslint-config
    ];

    // Display a message
    this.log(chalk.green('\nInstalling ESLint-related dependencies…'));

    // Install dev dependencies
    this.yarnInstall(devDependencies, { 'dev': true, silent: true }).then(() => {
      this.log(chalk.green('Installed ESLint-related dependencies.'));
    });
  }
};
