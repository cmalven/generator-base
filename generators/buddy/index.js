'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const kebab = require('lodash/kebabCase');
const isEmpty = require('lodash/isEmpty');

module.exports = class extends Generator {
  prompting() {
    console.log(chalk.yellow('Buddy Config'));

    let options = this.options || {};
    this.props = {};
    return this.prompt([
      {
        type: 'input',
        name: 'projectTitle',
        message: 'What is the title of this project?',
        validate: value => {
          return isEmpty(value) ? 'Please enter a project title.' : true;
        },
        default: options.projectTitle || 'My Project',
      },
      {
        type: 'input',
        name: 'projectName',
        message: 'What is the name of this project (used as repo name)?',
        validate: value => {
          return isEmpty(value) ? 'Please enter a project name.' : true;
        },
        default(answers) {
          return options.projectName || kebab(answers.projectTitle);
        },
      },
    ]).then(props => {
      this.props = props;
    });
  }

  writing() {
    this.log(chalk.green('Writing buddy files...'));

    this.fs.copyTpl(
      this.templatePath('buddy.yml'),
      this.destinationPath('buddy.yml'),
      this.props
    );
  }

  end() {
    this.log(chalk.green('Installed buddy.works deployment configuration.'));
  }
};
