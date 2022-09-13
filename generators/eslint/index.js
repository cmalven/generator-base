'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');

module.exports = class extends Generator {
  writing() {
    this.log(chalk.green('Writing eslint files...'));

    this.fs.copy(
      this.templatePath('.eslintrc'),
      this.destinationPath('.eslintrc'),
    );

    this.fs.copy(
      this.templatePath('.eslintignore'),
      this.destinationPath('.eslintignore'),
    );
  }

  install() {
    const devDependencies = [
      '@malven/eslint-config',
      '@malven/eslint-config-typescript',
      '@types/node',
      '@typescript-eslint/eslint-plugin',
      '@typescript-eslint/parser',
      'eslint@8.22.0', // TODO: Pinned version for now to avoid issues with ESLint in Jetbrains IDEs
      'typescript',
    ];

    // Display a message
    this.log(chalk.green('\nInstalling ESLint-related dependencies…'));

    // Install dev dependencies
    this.npmInstall(devDependencies, { 'save-dev': true, silent: true });
  }

  end() {
    this.log(chalk.green('Installed ESLint-related dependencies.'));
  }
};
