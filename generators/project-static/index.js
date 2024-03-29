'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const prompts = require('./modules/prompts');
const fs = require('fs');
const extend = require('lodash/extend');
const yosay = require('yosay');
const path = require('path');
const mkdirp = require('mkdirp');
const getDestinationRoot = require('../utils/getDestinationRoot');

module.exports = class extends Generator {
  paths() {
    this.destinationRoot(getDestinationRoot());
  }

  initializing() {
    this.closingStatements = [];
  }

  prompting() {
    this.log(yosay(
      'Welcome to the impressive ' + chalk.red('Static Site') + ' generator!'
    ));

    return this.prompt(prompts).then(props => {
      this.props = extend(props, {
        authorName: 'Malven Co.',
        authorEmail: 'chris@malven.co',
        authorUrl: 'https://malven.co',
        githubName: 'cmalven',
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

  build() {
    let buildOptions = {
      dist: 'dist',
      templateSrc: 'src/templates/',
      templateDist: 'dist/',
      imageSrc: 'src/images/',
      imageDist: 'src/static/images/',
    };

    // Currently only supports gulp for building
    this.composeWith(require.resolve('../build'), buildOptions);
  }

  writing() {
    this.log(chalk.green('Generating static app files...'));

    // Twig
    this.fs.copyTpl(
      this.templatePath('src/templates'),
      this.destinationPath('src/templates'),
      this.props
    );

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
  }
};
