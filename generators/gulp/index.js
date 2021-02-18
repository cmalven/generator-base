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
      this.templatePath('babel.config.json'),
      this.destinationPath('babel.config.json')
    );

    this.fs.copyTpl(
      this.templatePath('gulp/tasks'),
      this.destinationPath('gulp/tasks'), this.options, {}, {
        globOptions: {
          ignore: this.options.useTwig ? [] : ['**/twig.js'],
        },
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
      'eslint-loader',
      'glslify-loader',
      'gulp',
      'autoprefixer',
      'gulp-changed-in-place',
      'gulp-postcss',
      'gulp-imagemin',
      'gulp-pixrem',
      'gulp-replace',
      'gulp-rev',
      'gulp-sass',
      'gulp-sass-glob',
      'gulp-shell',
      'gulp-stylelint',
      'gulp-svg-sprite',
      'jsonfile',
      'node-libs-browser',
      'postcss',
      'postcss-import',
      'raw-loader',
      'require-dir',
      'script-loader',
      'strip-ansi',
      'terser-webpack-plugin',
      'uglifyjs-webpack-plugin',
      'undertaker-forward-reference',
      'webpack-bundle-analyzer',
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
