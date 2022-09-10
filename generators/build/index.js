'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const prompts = require('./modules/prompts');
const fs = require('fs');

module.exports = class extends Generator {
  prompting() {
    return this.prompt(prompts(this.options)).then(function(options) {
      Object.assign(this.options, options);
    }.bind(this));
  }

  eslint() {
    this.composeWith(require.resolve('../eslint'));
  }

  stylelint() {
    this.composeWith(require.resolve('../stylelint'));
  }

  writing() {
    this.log(chalk.green('Writing build files...'));

    this.fs.copyTpl(
      this.templatePath('gulpfile.js'),
      this.destinationPath('gulpfile.js'),
      this.options,
    );

    this.fs.copyTpl(
      this.templatePath('vite.config.js'),
      this.destinationPath('vite.config.js'),
      this.options,
    );

    this.fs.copy(
      this.templatePath('.browserslistrc'),
      this.destinationPath('.browserslistrc')
    );

    this.fs.copy(
      this.templatePath('.nvmrc'),
      this.destinationPath('.nvmrc')
    );

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

    this.fs.copy(
      this.templatePath('src/images/svg'),
      this.destinationPath('src/images/svg')
    );
  }

  install() {
    const devDependencies = [
      '@malven/gulp-tasks',
      'gulp',
      '@vitejs/plugin-legacy',
      'vite',
      'vite-plugin-craftcms@1.0.0-5',
      'vite-plugin-mkcert',
      'vite-plugin-restart',
      'vite-plugin-sass-glob-import',
    ];

    // Display a message
    this.log(chalk.yellow('\nInstalling build-related dependencies…'));

    // Install dev dependencies
    this.npmInstall(devDependencies, { 'save-dev': true, silent: true });
  }

  end() {
    this.log(chalk.green('Installed build-related dependencies.'));
  }
};
