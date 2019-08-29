'use strict';
const Generator = require('yeoman-generator');
const extend = require('deep-extend');
const chalk = require('chalk');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.props = {};
  }

  prompting() {
    const prompts = [
      {
        type: 'checkbox',
        name: 'deps',
        message: 'Which optional style dependencies do you want installed?',
        choices: [
          {
            name: 'Sass MQ',
            value: 'sass-mq',
            checked: true
          },
          {
            name: 'Sass Toolkit',
            value: '@malven/sass-toolkit',
            checked: true
          }
        ],
        default: []
      },
      {
        type: 'confirm',
        name: 'includeObjectsLayouts',
        message: 'Would you like to include default object and layout styles?',
        default: true
      }
    ];

    return this.prompt(prompts).then(props => {
      this.props = extend(this.props, props);
    });
  }

  writing() {
    this.log(chalk.green('Writing styles files...'));
    this.fs.copyTpl(
      this.templatePath('main.scss'),
      this.destinationPath('src/styles/main.scss'),
      {
        deps: this.props.deps
      }
    );

    this.fs.copyTpl(
      this.templatePath('base/*'),
      this.destinationPath('src/styles/base'),
      {
        deps: this.props.deps
      }
    );

    this.fs.copy(
      this.templatePath('util/*'),
      this.destinationPath('src/styles/util')
    );

    if (this.props.includeObjectsLayouts) {
      this.fs.copy(
        this.templatePath('objects'),
        this.destinationPath('src/styles/objects')
      );
      this.fs.copy(
        this.templatePath('layout'),
        this.destinationPath('src/styles/layout')
      );
    }
  }

  install() {
    this.log(chalk.yellow('\nInstalling style-related dependencies…'));
    const deps = this.props.deps.concat([
      'reset.css',
      'normalize.css'
    ]);
    this.yarnInstall(deps, { silent: true });
  }

  end() {
    this.log(chalk.green('Installed style-related dependencies.'));
  }
};
