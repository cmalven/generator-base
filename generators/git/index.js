'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const fs = require('fs');

module.exports = class extends Generator {
  prompting() {
    const prompts = [
      {
        type: 'confirm',
        name: 'addGithubActionWorkflows',
        message: 'Add workflows for Github Actions deployment?',
        default: false,
      },
    ];

    return this.prompt(prompts).then(function(options) {
      Object.assign(this.options, this.options);
    }.bind(this));
  }

  writing() {
    if (this.fs.exists(this.destinationPath('.gitignore'))) {
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
    this.log(chalk.green(`Created .gitignore.`));

    if (this.options.addGithubActionWorkflows) {
      this.fs.copy(
        this.templatePath('workflows'),
        this.destinationPath('.github/workflows')
      );
      this.log(chalk.green(`Added Git action workflows.`));
    }

    this.spawnCommandSync('git', ['init', '--quiet']);
    this.log(chalk.green('Initialized git repo.'));
  }
};
