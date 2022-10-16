'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const dependencies = require('./prompts/dependencies');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.props = {};
  }

  prompting() {
    const prompts = [{
      type: 'checkbox',
      name: 'deps',
      message: 'Which script dependencies do you want installed?',
      choices: dependencies,
      default: [],
    }];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    this.log(chalk.green('Writing scripts files...'));
    const { deps = [] } = this.props;

    // Modu Modules
    if (deps.indexOf('@malven/modu') > -1) {
      this.fs.copy(
        this.templatePath('modules/'),
        this.destinationPath('src/scripts/modules'),
      );
    }

    // Utils
    this.fs.copy(
      this.templatePath('utils/'),
      this.destinationPath('src/scripts/utils'),
    );

    // Typescript Config
    this.fs.copy(
      this.templatePath('tsconfig.json'),
      this.destinationPath('tsconfig.json'),
    );

    // Main
    this.fs.copyTpl(
      this.templatePath('main.ts'),
      this.destinationPath('src/scripts/main.ts'),
      {
        deps,
      },
    );

    // Object Fit Videos
    if (deps.indexOf('object-fit-videos') > -1) {
      this.fs.copy(
        this.templatePath('types/object-fit-videos.d.ts'),
        this.destinationPath('src/scripts/types/object-fit-videos.d.ts'),
      );
    }
  }

  install() {
    if (this.props.deps && this.props.deps.length) {
      this.log(chalk.yellow('\nInstalling script-related dependencies…'));
      this.npmInstall(this.props.deps, { silent: true });
    }
  }

  end() {
    if (this.props.deps && this.props.deps.length) {
      this.log(chalk.green('Installed script-related dependencies.'));
    }
  }
};
