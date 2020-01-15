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
    this.log(chalk.green('Writing gulp files...'));

    this.fs.copy(
      this.templatePath('gulpfile.js'),
      this.destinationPath('gulpfile.js')
    );

    this.fs.copy(
      this.templatePath('.browserslistrc'),
      this.destinationPath('.browserslistrc')
    );

    this.fs.copy(
      this.templatePath('.babelrc'),
      this.destinationPath('.babelrc')
    );

    this.fs.copyTpl(
      this.templatePath('gulp/tasks'),
      this.destinationPath('gulp/tasks'), this.options, {}, {
        globOptions: {
          ignore: this.options.useTwig ? [] : ['**/twig.js']
        }
      }
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
      this.templatePath('gulp/utils'),
      this.destinationPath('gulp/utils')
    );

    this.fs.copy(
      this.templatePath('src/images/svg/icon/gitkeep'),
      this.destinationPath('src/images/svg/icon/.gitkeep')
    );
    this.fs.copy(
      this.templatePath('src/images/svg/full/gitkeep'),
      this.destinationPath('src/images/svg/full/.gitkeep')
    );
    this.fs.copy(
      this.templatePath('src/images/svg/inline/gitkeep'),
      this.destinationPath('src/images/svg/inline/.gitkeep')
    );

    this.fs.copyTpl(
      this.templatePath('gulp/config.js'),
      this.destinationPath('gulp/config.js'),
      this.options
    );

    if (this.options.useTwig) {
      this.fs.copyTpl(
        this.templatePath('src/templates'),
        this.destinationPath('src/templates'),
        this.options
      );
    }
  }

  install() {
    const devDependencies = [
      'webpack',
      '@babel/core',
      '@babel/preset-env',
      '@babel/preset-react',
      'babel-loader',
      'browser-sync',
      'core-js@3',
      'cssnano',
      'del',
      'dotenv',
      'gulp',
      'autoprefixer',
      'gulp-changed-in-place',
      'gulp-css-globbing',
      'gulp-eslint',
      'gulp-postcss',
      'gulp-imagemin',
      'gulp-pixrem',
      'gulp-replace',
      'gulp-rev',
      'gulp-sass',
      'gulp-shell',
      'gulp-stylelint',
      'gulp-svg-sprite',
      'jsonfile',
      'node-libs-browser',
      'postcss-import',
      'require-dir',
      'script-loader',
      'strip-ansi',
      'uglifyjs-webpack-plugin',
      'undertaker-forward-reference'
    ];

    // Add twig if desired
    if (this.options.useTwig) {
      devDependencies.push('gulp-htmlmin');
      devDependencies.push('gulp-twig');
      devDependencies.push('twig-markdown');
    }

    // Display a message
    this.log(chalk.yellow('\nInstalling gulp-related dependencies…'));

    // Install dev dependencies
    this.npmInstall(devDependencies, { 'save-dev': true, silent: true });
  }

  end() {
    this.log(chalk.green('Installed gulp-related dependencies.'));
  }
};
